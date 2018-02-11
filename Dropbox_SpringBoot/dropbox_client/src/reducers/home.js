var home_initialstate ={
    firstname:"",
    lastname:"",
    email:"",
    status:"",
    msg:"",
    userid:"",
    files:[],
    currentfolderid:""
}

export default function(state=home_initialstate,action){
    
    if(action.type === "HOME_RESULT"){
        return{
            ...state,
            status:action.payload.response.status,
            firstname:action.payload.user.firstname,  
            lastname:action.payload.user.lastname,
            email:action.payload.user.email,
            userid:action.payload.user.id,
            msg:""
        }
    }

    if(action.type === "HOME_ERROR"){
        return{
            ...state,
            status:"error",
            msg:"something went wrong"       
        }
    }


    if(action.type === "UPLOAD_RESULT"){
        return{
            ...state,
            files:action.payload.contents,
            status:action.payload.response.statuss,
            msg:action.payload.response.msg
        }
    }

    if(action.type === "FOLDER_RESULT"){
        return{
            ...state,
            files:action.payload.contents,
            currentfolderid:action.payload.parentfolderid,
            status:action.payload.response.status,
            msg:""
        }
    }
    
   
    if(action.type === "UPLOAD_ERROR"){
        return{
            ...state,
            status:action.payload.status,
            msg:action.payload.msg
                 
        }
    }
    if(action.type === "ROOT_RESULT"){
        return{
            ...state,
            currentfolderid:action.payload.rootid,
            msg:""     
        }
    }
    if(action.type === "CREATE_FOLDER_ERROR"){
        return{
            ...state,
            status:action.payload.status,
            msg:action.payload.msg
                 
        }
    }
    if(action.type === "CREATE_FOLDER_RESULT"){
        return{
            ...state,
            files:action.payload.contents,
            currentfolderid:action.payload.parentfolderid,
            status:action.payload.response.status,
            msg:action.payload.response.msg,
        }
    }

    if(action.type === "DELETE_RESULT"){
        return{
            ...state,
            status:action.payload.status,
            msg:action.payload.msg
        }
    }
    if(action.type === "STAR_RESULT"){
        return{
            ...state,
            status:action.payload.status,
            msg:action.payload.msg
        }
    }
    if(action.type === "SHARE_RESULT"){
        return{
            ...state,
            status:action.payload.status,
            msg:action.payload.msg
        }
    }
   
    if(action.type === "LOGOUT"){
        return{
            ...state,
            status:action.payload.status,
            msg:action.payload.msg
        }
    }
    return state;
}