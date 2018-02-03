import {LOAD_ACTIVITY} from '../actions/index';

const initialState = {
    activities:[]
};


const activity = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ACTIVITY :
            state = {
                activities: action.obj.result
            };
            console.log(state);
            return state;

        default :
            return state;
    }
};

export default activity;