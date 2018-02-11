import axios from 'axios';
const URL = "http://localhost:8080";
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
export function SignUp(data){
    return  dispatch => {
        axios.post(`${URL}/user/signup`, data)
          .then((response) => {
            console.log(response.data)
            return dispatch({ type : "SIGNUP_RESULT", payload : response.data } )
          })
          .catch((error) => {
            return dispatch({ type : "SIGNUP_ERROR", payload : error } )
          });
     }
}