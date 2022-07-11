import { Types } from "../constants/Types";
import _ from 'lodash'


const initialState = {
    testVar: 'welcome to Native Project',
    homePage: 'home',
    items: [],
    allItems: [],
    originalItemsList: [],
    formValues: { boxName: '', items: [''] },
    initialFormValues: { boxName: '', items: [''] },
    formActionType: 'add',
    itemIndex: null,
    boxItems: null,

}

const test = (state = initialState, action) => {
    switch (action.type) {
        case Types.TEST_ACTION:
            { return action.payload; }
        case Types.HOME_PAGE:
            return { ...state, homePage: action.payload }
        case Types.ITEMS_LIST:
            return { ...state, items: action.payload, allItems: _.cloneDeep(action.payload) }
        case Types.DELETE_ITEMS:
            return { ...state, items: action.payload, allItems: _.cloneDeep(action.payload) }
        case Types.EDIT_BOX_DETAILS:
            console.log('pauload.......', action.payload)
            return { ...state, formValues: action.payload }
        case Types.FORM_ACTION_TYPE:
            return { ...state, formActionType: action.payload, itemIndex: action.itemIndex }
        case Types.BOX_ITEMS:
            return { ...state, boxItems: action.payload }
        case Types.SEARCH_ITEMS:
            return { ...state, items: action.payload }

        default:
            return state;
    }
};

export default test;