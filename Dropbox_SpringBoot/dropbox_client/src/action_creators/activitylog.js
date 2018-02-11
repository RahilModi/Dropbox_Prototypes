import axios from 'axios';
const URL = "http://localhost:8080";

export function INIT(user){
    return  dispatch => {
        axios.post(`${URL}/user/checksession`,user)
        .then(resp => {
            console.log(JSON.stringify(resp.data))
            var user = resp.data.user
            dispatch({ type : "PROFILE_RESULT", payload : resp.data })
                axios.post(`${URL}/user/activities`,user)
                .then(response => {
                    console.log(response);
                return dispatch({ type : "ACTIVITYLOG_RESULT", payload : response } )
                })
                .catch(function (err) {
                return dispatch({ type : "ACTIVITYLOG_ERROR", payload : err } )
                });
            })
        .catch(function (err) {
            return dispatch({ type : "PROFILE_ERROR", payload : err } )
        });
    }       
}  

export function LOGOUT(token){
    localStorage.clear();
    sessionStorage.clear();
    return ({ type : "LOGOUT", payload : "" } )
}
