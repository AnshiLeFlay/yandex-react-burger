import { users } from "./users";
import * as types from "../constants/users";

describe("index users reducer", () => {
    it("should return initial state", () => {
        expect(users(undefined, {})).toEqual({
            forgotRequest: false,
            forgotFailed: false,
            resetRequest: false,
            resetFailed: false,
            registerRequest: false,
            registerFailed: false,
            loginRequest: false,
            loginFailed: false,
            logoutRequest: false,
            logoutFailed: false,
            tokenRequest: false,
            tokenFailed: false,
            updateRequest: false,
            updateFailed: false,
            userRequest: false,
            userFailed: false,
            user: {
                email: "",
                name: "",
                accessToken: "",
                refreshToken: "",
            }
        });
    });
});
