import axios from 'axios';

const URL = "http://localhost:8080";

export function INIT(user){
  return  dispatch => {
     
    axios.post(`${URL}/user/checksession`,user)
    .then(response => {
        console.log(JSON.stringify(response.data))
        return dispatch({ type : "PROFILE_RESULT", payload : response.data } )
        })
        .catch(error => {
          return dispatch({ type : "PROFILE_ERROR", payload : error } )
        });
       
   }
}
export function UPDATE(email,password,firstname,lastname,aboutme,interests,userid){
 
    return  dispatch => {
       
        axios.post(`${URL}/user/update`, {
          id:userid,
          firstname,
          lastname,
          email,
          password,
          aboutme,
          interests,
          all:firstname+" "+lastname+" ("+email+")"
          })
          .then(response => {
            return dispatch({ type : "PROFILE_RESULT", payload : response.data } )
          })
          .catch(error => {
            return dispatch({ type : "PROFILE_ERROR", payload : error } )
          });
         
     }
  }
