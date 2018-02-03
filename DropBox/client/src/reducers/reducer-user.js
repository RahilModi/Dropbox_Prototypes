import {LOAD_USER} from '../actions/index';
import {SAVE_USER} from '../actions/index';

const initialState = {
    UserId: '',
    FirstName: '',
    LastName: '',
    EmailId: '',
    Password: '',
    Work: '',
    Education: '',
    Contact: '',
    Interests: '',
    isLoggedIn: false
};


const user = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER :
            //return Object.assign({}, state,
            state = {
                UserId: action.obj.UserId,
                FirstName: action.obj.FirstName,
                LastName: action.obj.LastName,
                EmailId: action.obj.EmailId,
                Password: action.obj.Password,
                Work: action.obj.Work,
                Education: action.obj.Education,
                Contact: action.obj.Contact,
                Interests: action.obj.Interests,
                isLoggedIn: true
            };
            console.log(state);
            return state;

        case SAVE_USER :
            state = {
                UserId: state.UserId,
                FirstName: action.obj.FirstName,
                LastName: action.obj.LastName,
                EmailId: action.obj.EmailId,
                Password: state.Password,
                Work: action.obj.Work,
                Education: action.obj.Education,
                Contact: action.obj.Contact,
                Interests: action.obj.Interests,
                isLoggedIn: true
            };
            console.log(state);
            return state;

        default :
            return state;
    }
};

export default user;