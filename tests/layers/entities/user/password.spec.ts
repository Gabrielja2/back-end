import { UserPassword, InvalidUserPasswordError } from "@/layers/entities";

describe(("Object Value - UserPassword"), () => {

    test("Should not create password, because password is empty", () => {
        const invalidPassword = "";

        const sut = UserPassword.create(invalidPassword);

        expect(sut).toBeInstanceOf(InvalidUserPasswordError);
    });

    test("Should not create password, because password is not respect regEx", () => {
        const invalidPassword = "password";

        const sut = UserPassword.create(invalidPassword);

        expect(sut).toBeInstanceOf(InvalidUserPasswordError);
    });

    test("Should create password", () => {
        const password = "Password1234";

        const sut = UserPassword.create(password);

        if (!(sut instanceof Error)) expect(sut.value).toBe(password);
        expect(sut).toBeInstanceOf(UserPassword);
    });
});