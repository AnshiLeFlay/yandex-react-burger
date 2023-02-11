import { wsReducer } from "./wsReducer";
import * as types from "../constants/ws";

describe("index users reducer", () => {
    it("should return initial state", () => {
        expect(wsReducer(undefined, {})).toEqual({
            url: "",
            wsConnected: false,
            messages: {}
        });
    });
});
