import { getType } from 'typesafe-actions';
import { UI } from '../../types/ui';

import * as actions from '../actions';
import { RootAction } from '../reducers';


const initialState: UI = {
    sayHello: ""
}

export default function uiReducer(state: UI = initialState, action: RootAction): UI {

    switch (action.type) {

        case getType(actions.setSayHelloMessage):
            return { ...state, sayHello: action.payload };
       
        default:
            return {
                ...state
            };
    }
}