import { AuthenticateUserMiddleware, unauthorized } from "@/layers/presentation";
import { JsonWebTokenStub } from "./stubs";
import { JsonWebTokenInvalidError, UnauthorizedError } from "@/layers/use-cases";

const makeSut = () => {
    const jsonWebToken = new JsonWebTokenStub();

    const sut = new AuthenticateUserMiddleware(jsonWebToken);

    return { sut, jsonWebToken }
}

const makeBody = (token: string) => {
    return {

        authorization: token

    };
};

describe(("Presentation - AuthenticateUserMiddleware"), () => {
    test("Shoul not authenticate user if authorization token is empty", async () => {
        const { authorization } = makeBody("");
        const { sut } = makeSut();


        const result = await sut.handle({ headers: { authorization } });

        expect(result).toEqual(unauthorized(new UnauthorizedError("Você não está logado")));

    });

    test("Shoul not authenticate user if Bearer is invalid", async () => {
        const { authorization } = makeBody("B token");
        const { sut } = makeSut();

        const result = await sut.handle({ headers: { authorization } });

        expect(result).toEqual(unauthorized(new UnauthorizedError("Código inválido")));
    });

    test("Shoul not authenticate user if authorization token is invalid", async () => {
        const { authorization } = makeBody("Bearer invalid_token");
        const { sut, jsonWebToken } = makeSut();
        jest.spyOn(jsonWebToken, "verifyJsonWebToken").mockReturnValueOnce(new JsonWebTokenInvalidError());

        const result = await sut.handle({ headers: { authorization } });

        expect(result).toEqual(unauthorized(new JsonWebTokenInvalidError()));
    });
});