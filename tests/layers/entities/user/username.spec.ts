import { UserName, InvalidUserNameError } from "@/layers/entities";

describe(("Object Value - UserName"), () => {

    test("Should not create username, because username is empty", () => {
        const invalidUsername = "";

        const sut = UserName.create(invalidUsername);

        expect(sut).toBeInstanceOf(InvalidUserNameError);
    });

    test("Should not create username, because the username has more than 256 characters", () => {
        const invalidUsername = "c".repeat(300);

        const sut = UserName.create(invalidUsername);

        expect(sut).toBeInstanceOf(InvalidUserNameError);
    });

    test("Should not create username, because the username has more than 256 characters", () => {
        const username = "username";

        const sut = UserName.create(username);

        if (!(sut instanceof Error)) expect(sut.value).toBe(username);
        expect(sut).toBeInstanceOf(UserName);
    });
});