import { UserEmail, InvalidUserEmailError } from "@/layers/entities";

describe(("Object Value - UserEmail"), () => {

    test("Should not create email, because email is empty", () => {
        const invalidEmail = "";

        const sut = UserEmail.create(invalidEmail);

        expect(sut).toBeInstanceOf(InvalidUserEmailError);
    });

    test("Should not create email, because email has more than 256 characters", () => {
        const invalidEmail = "*".repeat(300);

        const sut = UserEmail.create(invalidEmail);

        expect(sut).toBeInstanceOf(InvalidUserEmailError);
    });

    test("Should not create email, because email is not respect regEx", () => {
        const invalidEmail = "email.com";

        const sut = UserEmail.create(invalidEmail);

        expect(sut).toBeInstanceOf(InvalidUserEmailError);
    });

    test("Should not create email, because the email account has more than 64 characters", () => {
        const invalidAccount = "*".repeat(100);

        const sut = UserEmail.create(`${invalidAccount}@test.com`);

        expect(sut).toBeInstanceOf(InvalidUserEmailError);
    });

    test("Should not create email, because the email domain has more than 64 characters", () => {
        const invalidDomain = "*".repeat(100);

        const sut = UserEmail.create(`email@${invalidDomain}.com`);

        expect(sut).toBeInstanceOf(InvalidUserEmailError);
    });

    test("Should create email", () => {
        const email = "email@test.com";

        const sut = UserEmail.create(email);

        if (!(sut instanceof Error)) expect(sut.value).toBe(email);
        expect(sut).toBeInstanceOf(UserEmail);
    });
});