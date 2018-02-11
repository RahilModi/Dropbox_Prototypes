import axios from 'axios';
const URL = "http://localhost:8080";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
export function INIT(){
  return  dispatch => {
     axios.get(`${URL}/user`)
        .then(function (response) {
         return dispatch({ type : "SIGNIN_RESULT", payload : response.data } )
  
        })
        .catch(error => {
          return dispatch({ type : "SIGNIN_ERROR", payload : error } )
        });
  }
}
export function SignIn(data){
    return  dispatch => {
          fetch(`${URL}/user/signin`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        }).then(response => { return response.json(); })
        .then(function(data) {
          if(data.response.status ==='success'){
            console.log(data.user);
            localStorage.setItem("id",data.user.id);
          }
          dispatch({ type : "SIGNIN_RESULT", payload : data } )
        }).catch(error => {
          return dispatch({ type : "SIGNIN_ERROR", payload : error } )
        })
      }
    }