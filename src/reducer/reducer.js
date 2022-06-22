import { Types } from "../constants/Types";


const initialState = {
    testVar: 'welcome to Native Project',
    homePage: true,
    items: [],
}

const test = (state = initialState, action) => {
    switch (action.type) {
        case Types.TEST_ACTION:
            { return action.payload; }
        case Types.HOME_PAGE:
            return { ...state, homePage: action.payload }
        case Types.ITEMS_LIST:
            return { ...state, items: action.payload }
        default:
            return state;
    }
};

export default test;