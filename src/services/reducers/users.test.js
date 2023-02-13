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
            },
        });
    });

    it("should handle usersReducer", () => {
        expect(
            users(
                {},
                {
                    type: types.PASSWORD_FORGOT_REQUEST,
                }
            )
        ).toEqual(
            expect.objectContaining({
                forgotRequest: true,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.PASSWORD_FORGOT_SUCCESS,
                }
            )
        ).toEqual(
            expect.objectContaining({
                forgotFailed: false,
                forgotRequest: false,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.PASSWORD_FORGOT_FAILED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                forgotFailed: true,
                forgotRequest: false,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.PASSWORD_RESET_REQUEST,
                }
            )
        ).toEqual(
            expect.objectContaining({
                resetRequest: true,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.PASSWORD_RESET_SUCCESS,
                }
            )
        ).toEqual(
            expect.objectContaining({
                resetFailed: false,
                resetRequest: false,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.PASSWORD_RESET_FAILED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                resetFailed: true,
                resetRequest: false,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.REGISTER_REQUEST,
                }
            )
        ).toEqual(
            expect.objectContaining({
                registerRequest: true,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.REGISTER_SUCCESS,
                }
            )
        ).toEqual(
            expect.objectContaining({
                registerFailed: false,
                registerRequest: false,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.REGISTER_FAILED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                registerFailed: true,
                registerRequest: false,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.LOGIN_REQUEST,
                }
            )
        ).toEqual(
            expect.objectContaining({
                loginRequest: true,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.LOGIN_SUCCESS,
                    email: "test@email.com",
                    name: "testUser",
                    accessToken: "access",
                    refreshToken: "refresh",
                }
            )
        ).toEqual(
            expect.objectContaining({
                loginFailed: false,
                loginRequest: false,
                user: {
                    email: "test@email.com",
                    name: "testUser",
                    accessToken: "access",
                    refreshToken: "refresh",
                },
            })
        );

        expect(
            users(
                {},
                {
                    type: types.LOGIN_FAILED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                loginFailed: true,
                loginRequest: false,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.LOGOUT_REQUEST,
                }
            )
        ).toEqual(
            expect.objectContaining({
                logoutRequest: true,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.LOGOUT_SUCCESS,
                }
            )
        ).toEqual(
            expect.objectContaining({
                logoutFailed: false,
                logoutRequest: false,
                user: {
                    email: "",
                    name: "",
                    accessToken: "",
                    refreshToken: "",
                },
            })
        );

        expect(
            users(
                {},
                {
                    type: types.LOGOUT_FAILED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                logoutFailed: true,
                logoutRequest: false,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.UPDATE_TOKEN_REQUEST,
                }
            )
        ).toEqual(
            expect.objectContaining({
                tokenRequest: true,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.UPDATE_TOKEN_SUCCESS,
                    accessToken: "accessToken",
                    refreshToken: "refreshToken",
                }
            )
        ).toEqual(
            expect.objectContaining({
                tokenFailed: false,
                tokenRequest: false,
                user: {
                    accessToken: "accessToken",
                    refreshToken: "refreshToken",
                },
            })
        );

        expect(
            users(
                {},
                {
                    type: types.UPDATE_TOKEN_FAILED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                tokenFailed: true,
                tokenRequest: false,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.UPDATE_USER_REQUEST,
                }
            )
        ).toEqual(
            expect.objectContaining({
                updateRequest: true,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.UPDATE_USER_SUCCESS,
                    email: "test@email.com",
                    name: "testUser",
                }
            )
        ).toEqual(
            expect.objectContaining({
                updateFailed: false,
                updateRequest: false,
                user: {
                    email: "test@email.com",
                    name: "testUser",
                },
            })
        );

        expect(
            users(
                {},
                {
                    type: types.UPDATE_USER_FAILED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                updateFailed: true,
                updateRequest: false,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.GET_USER_DATA_REQUEST,
                }
            )
        ).toEqual(
            expect.objectContaining({
                userRequest: true,
            })
        );

        expect(
            users(
                {},
                {
                    type: types.GET_USER_DATA_SUCCESS,
                    email: "test@email.com",
                    name: "testUser",
                }
            )
        ).toEqual(
            expect.objectContaining({
                userFailed: false,
                userRequest: false,
                user: {
                    email: "test@email.com",
                    name: "testUser",
                },
            })
        );

        expect(
            users(
                {},
                {
                    type: types.GET_USER_DATA_FAILED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                userFailed: true,
                userRequest: false,
            })
        );
    });
});
