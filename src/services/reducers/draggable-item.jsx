import { UPDATE_TYPE } from "../actions/index";

const initialState = {
    items: []
};

export const draggableItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TYPE: {
            return {
                ...state,
                items: state.items.map(items =>
                    items.id === action.id ? {...items, board: action.board} : items
                )
            };
        }
        default:
            return state;
    }
}