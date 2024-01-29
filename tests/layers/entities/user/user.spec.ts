import { User, InvalidUserEmailError, InvalidUserPasswordError, InvalidUserNameError } from "@/layers/entities";

describe(("Entity - User"), () => {

    test("Should not create user, because email is not valid", () => {
        const invalidEmail = "email.com";
        const username = "username";
        const password = "Password1234";

        const sut = User.create(username, invalidEmail, password);

        expect(sut).toBeInstanceOf(InvalidUserEmailError);
    });

    test("Should not create user, because username is not valid", () => {
        const email = "email@test.com";
        const invalidUsername = "";
        const password = "Password1234";

        const sut = User.create(invalidUsername, email, password);

        expect(sut).toBeInstanceOf(InvalidUserNameError);
    });

    test("Should not create user, because password is not valid", () => {
        const email = "email@test.com";
        const username = "username";
        const invalidPassword = "password";

        const sut = User.create(username, email, invalidPassword);

        expect(sut).toBeInstanceOf(InvalidUserPasswordError);
    });



    test("Should create user", () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";

        const sut = User.create(username, email, password);

        expect(sut).toBeInstanceOf(User);
    });
});