import { wsReducer } from "./wsReducer";
import * as types from "../constants/ws";

describe("index users reducer", () => {
    it("should return initial state", () => {
        expect(wsReducer(undefined, {})).toEqual({
            url: "",
            wsConnected: false,
            messages: {},
        });
    });

    it("should handle usersReducer", () => {
        expect(
            wsReducer(
                {},
                {
                    type: types.WS_CONNECTION_START,
                    url: "https://some.endpoit/",
                }
            )
        ).toEqual(
            expect.objectContaining({
                url: "https://some.endpoit/",
            })
        );

        expect(
            wsReducer(
                {},
                {
                    type: types.WS_CONNECTION_SUCCESS,
                }
            )
        ).toEqual(
            expect.objectContaining({
                error: undefined,
                wsConnected: true,
            })
        );

        expect(
            wsReducer(
                {},
                {
                    type: types.WS_CONNECTION_ERROR,
                    payload: "some error code",
                }
            )
        ).toEqual(
            expect.objectContaining({
                error: "some error code",
                wsConnected: false,
            })
        );

        expect(
            wsReducer(
                {},
                {
                    type: types.WS_CONNECTION_CLOSED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                error: undefined,
                wsConnected: false,
            })
        );

        expect(
            wsReducer(
                {},
                {
                    type: types.WS_GET_MESSAGE,
                    payload: '{"result":true, "count":42}',
                }
            )
        ).toEqual(
            expect.objectContaining({
                error: undefined,
                messages: {
                    count: 42,
                    result: true,
                },
            })
        );
    });
});
