import { CreateUserController, InvalidTypeError, MissingParamError, badRequest } from "@/layers/presentation";
import { CreateUserStub } from "./stubs";

const makeSut = () => {
    const createUserStub = new CreateUserStub();
    const sut = new CreateUserController(createUserStub);

    return {
        sut,
        createUserStub
    };
};

const makeBody = (email: unknown, username: unknown, password: unknown, confirmPassword: unknown) => {
    return {
        email,
        username,
        password,
        confirmPassword
    };
};

describe("Presentation - CreateUserController", () => {
    test("Should not create user, if username is empty", async () => {
        const data = makeBody("any_email", "", "any_password", "any_password");
        const { sut } = makeSut();

        const result = await sut.handle({ data });

        expect(result).toEqual(badRequest(new MissingParamError("username")));
    });


    test("Should not create user, if email is empty", async () => {
        const data = makeBody("", "any_username", "any_password", "any_password");
        const { sut } = makeSut();

        const result = await sut.handle({ data });

        expect(result).toEqual(badRequest(new MissingParamError("email")));
    });

    test("Should not create user, if password is empty", async () => {
        const data = makeBody("any_email", "any_username", "", "any_password");
        const { sut } = makeSut();

        const result = await sut.handle({ data });

        expect(result).toEqual(badRequest(new MissingParamError("password")));
    });

    test("Should not create user, if confirmPassword is empty", async () => {
        const data = makeBody("any_email", "any_username", "any_password", "");
        const { sut } = makeSut();

        const result = await sut.handle({ data });

        expect(result).toEqual(badRequest(new MissingParamError("confirmPassword")));
    })

    test("Should not create user, if name is with type error", async () => {
        const data = makeBody("any_email", 123, "any_password", "any_password");
        const { sut } = makeSut();

        const result = await sut.handle({ data });

        expect(result).toEqual(badRequest(new InvalidTypeError("username")));
    });

    test("Should not create user, if email is with type error", async () => {
        const data = makeBody(123, "any_name", "any_password", "any_password");
        const { sut } = makeSut();

        const result = await sut.handle({ data });

        expect(result).toEqual(badRequest(new InvalidTypeError("email")));
    });

    test("Should not create user, if password is with type error", async () => {
        const data = makeBody("any_email", "any_username", 123, "any_password");
        const { sut } = makeSut();

        const result = await sut.handle({ data });

        expect(result).toEqual(badRequest(new InvalidTypeError("password")));
    });

    test("Should not create user, if confirmPassword is with type error", async () => {
        const data = makeBody("any_email", "any_username", "any_password", 123);
        const { sut } = makeSut();

        const result = await sut.handle({ data });

        expect(result).toEqual(badRequest(new InvalidTypeError("confirmPassword")));
    })

    test("Should not create user, if use case return an error", async () => {
        const data = makeBody("any_email", "any_username", "any_password", "any_password");
        const { sut, createUserStub } = makeSut();
        jest.spyOn(createUserStub, "execute").mockReturnValueOnce(Promise.resolve(new Error("error")));

        const result = await sut.handle({ data });

        expect(result).toEqual(badRequest(new Error("error")));
    });

    test("Should create user", async () => {
        const data = makeBody("email@test.com", "username", "Password1234", "Password1234");
        const { sut } = makeSut();

        const result = await sut.handle({ data });


        expect(result.statusCode).toEqual(201);
        expect(result.response.email).toEqual(data.email);
    });

});