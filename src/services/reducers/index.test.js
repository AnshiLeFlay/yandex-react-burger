import { rootReducer } from ".";
import * as dataTypes from "../constants/data";
import * as ingredientsTypes from "../constants/ingredients";
import * as orderTypes from "../constants/order";

describe("index rootReducer", () => {
    it("should return initial state", () => {
        expect(rootReducer(undefined, {})).toEqual({
            data: {
                ingredients: [],
                dataRequest: false,
                dataFailed: false,
            },
            ingredients: {
                burgerIngredients: {
                    bun: "60d3b41abdacab0026a733c6",
                    consist: [
                        "60d3b41abdacab0026a733ce",
                        "60d3b41abdacab0026a733c8",
                        "60d3b41abdacab0026a733ca",
                    ],
                },
                currentIngredient: {},
            },
            order: {
                data: {},
                current: {},
                orderDataRequest: false,
                orderDataFailed: false,
                orderRequest: false,
                orderFailed: false,
            },
            users: {
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
            },
            ws: {
                url: "",
                wsConnected: false,
                messages: {},
            },
        });
    });

    //part for testing data reducer (dataTypes)

    it("should handle GET_DATA", () => {
        expect(
            rootReducer(
                {},
                {
                    type: dataTypes.GET_DATA_REQUEST,
                }
            )
        ).toEqual(
            expect.objectContaining({
                data: {
                    ingredients: [],
                    dataRequest: true,
                    dataFailed: false,
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: dataTypes.GET_DATA_FAILED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                data: {
                    ingredients: [],
                    dataRequest: false,
                    dataFailed: true,
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: dataTypes.GET_DATA_SUCCESS,
                    items: [],
                }
            )
        ).toEqual(
            expect.objectContaining({
                data: {
                    ingredients: [],
                    dataRequest: false,
                    dataFailed: false,
                },
            })
        );
    });

    //part for testing ingredients reducer (ingredientsTypes)

    it("should handle DATA_INGREDIENTS", () => {
        expect(
            rootReducer(
                {},
                {
                    type: ingredientsTypes.ADD_INGREDIENTS_CONSTRUCTOR,
                    item: "testID",
                    content: "bun",
                }
            )
        ).toEqual(
            expect.objectContaining({
                ingredients: {
                    burgerIngredients: {
                        bun: "testID",
                        consist: [
                            "60d3b41abdacab0026a733ce",
                            "60d3b41abdacab0026a733c8",
                            "60d3b41abdacab0026a733ca",
                        ],
                    },
                    currentIngredient: {},
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: ingredientsTypes.ADD_INGREDIENTS_CONSTRUCTOR,
                    item: "testID",
                    content: "",
                }
            )
        ).toEqual(
            expect.objectContaining({
                ingredients: {
                    burgerIngredients: {
                        bun: "60d3b41abdacab0026a733c6",
                        consist: [
                            "60d3b41abdacab0026a733ce",
                            "60d3b41abdacab0026a733c8",
                            "60d3b41abdacab0026a733ca",
                            "testID",
                        ],
                    },
                    currentIngredient: {},
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: ingredientsTypes.DELETE_INGREDIENTS_CONSTRUCTOR,
                    itemDelete: 0,
                }
            )
        ).toEqual(
            expect.objectContaining({
                ingredients: {
                    burgerIngredients: {
                        bun: "60d3b41abdacab0026a733c6",
                        consist: [
                            "60d3b41abdacab0026a733c8",
                            "60d3b41abdacab0026a733ca",
                        ],
                    },
                    currentIngredient: {},
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: ingredientsTypes.MOVE_INGREDIENTS_CONSTRUCTOR,
                    itemReplace: 0,
                    itemDrag: 1,
                }
            )
        ).toEqual(
            expect.objectContaining({
                ingredients: {
                    burgerIngredients: {
                        bun: "60d3b41abdacab0026a733c6",
                        consist: [
                            "60d3b41abdacab0026a733ca",
                            "60d3b41abdacab0026a733c8",
                        ],
                    },
                    currentIngredient: {},
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: ingredientsTypes.ADD_DATA_INGREDIENTS_MODAL,
                    item: {
                        _id: "testID",
                    },
                }
            )
        ).toEqual(
            expect.objectContaining({
                ingredients: {
                    burgerIngredients: {
                        bun: "60d3b41abdacab0026a733c6",
                        consist: [
                            "60d3b41abdacab0026a733ca",
                            "60d3b41abdacab0026a733c8",
                        ],
                    },
                    currentIngredient: { _id: "testID" },
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: ingredientsTypes.DELETE_DATA_INGREDIENTS_MODAL,
                }
            )
        ).toEqual(
            expect.objectContaining({
                ingredients: {
                    burgerIngredients: {
                        bun: "60d3b41abdacab0026a733c6",
                        consist: [
                            "60d3b41abdacab0026a733ca",
                            "60d3b41abdacab0026a733c8",
                        ],
                    },
                    currentIngredient: {},
                },
            })
        );
    });

    it("should handle ORDER", () => {
        expect(
            rootReducer(
                {},
                {
                    type: orderTypes.GET_ORDER_NUMBER_REQUEST,
                }
            )
        ).toEqual(
            expect.objectContaining({
                order: {
                    current: {},
                    data: {},
                    orderDataFailed: false,
                    orderDataRequest: false,
                    orderFailed: false,
                    orderRequest: true,
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: orderTypes.GET_ORDER_NUMBER_SUCCESS,
                    items: ["first", "second", "third"],
                }
            )
        ).toEqual(
            expect.objectContaining({
                order: {
                    current: {},
                    data: ["first", "second", "third"],
                    orderDataFailed: false,
                    orderDataRequest: false,
                    orderFailed: false,
                    orderRequest: false,
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: orderTypes.GET_ORDER_NUMBER_FAILED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                order: {
                    current: {},
                    data: {},
                    orderDataFailed: false,
                    orderDataRequest: false,
                    orderFailed: true,
                    orderRequest: false,
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: orderTypes.DELETE_ORDER_NUMBER,
                }
            )
        ).toEqual(
            expect.objectContaining({
                order: {
                    current: {},
                    data: {},
                    orderDataFailed: false,
                    orderDataRequest: false,
                    orderFailed: false,
                    orderRequest: false,
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: orderTypes.GET_ORDER_REQUEST,
                }
            )
        ).toEqual(
            expect.objectContaining({
                order: {
                    current: {},
                    data: {},
                    orderDataFailed: false,
                    orderDataRequest: true,
                    orderFailed: false,
                    orderRequest: false,
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: orderTypes.GET_ORDER_SUCCESS,
                    order: { orders: [["first", "second", "third"]] },
                }
            )
        ).toEqual(
            expect.objectContaining({
                order: {
                    current: ["first", "second", "third"],
                    data: {},
                    orderDataFailed: false,
                    orderDataRequest: false,
                    orderFailed: false,
                    orderRequest: false,
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: orderTypes.GET_ORDER_FAILED,
                }
            )
        ).toEqual(
            expect.objectContaining({
                order: {
                    current: {},
                    data: {},
                    orderDataFailed: true,
                    orderDataRequest: false,
                    orderFailed: false,
                    orderRequest: false,
                },
            })
        );

        expect(
            rootReducer(
                {},
                {
                    type: orderTypes.DELETE_ORDER,
                }
            )
        ).toEqual(
            expect.objectContaining({
                order: {
                    current: {},
                    data: {},
                    orderDataFailed: false,
                    orderDataRequest: false,
                    orderFailed: false,
                    orderRequest: false,
                },
            })
        );
    });
});
