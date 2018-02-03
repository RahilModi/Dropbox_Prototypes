
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:4001';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers,
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });

export const doSignUp = (payload) =>
    fetch(`${api}/afterSignUp`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });

export const doUpload = (payload) =>
    fetch(`${api}/uploadFile/uploadFile`, {
        method: 'POST',
        headers:{
            'Accept': 'application/json'
        },
        body: payload,
        credentials:'include'
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });

export const doMkdir = (payload) =>

    fetch(`${api}/mkdir`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });

export const deleteDir = (payload) =>
    fetch(`${api}/delDir`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });


export const getChildDirs =(payload) =>

    fetch(`${api}/getDir`, {
        method: 'POST',
        headers,
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });


export const doShareFile = (payload) =>
    fetch(`${api}/shareFile`, {
        method: 'POST',
        headers,
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });

export const doLogout = (payload) =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers,
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });


export const doDownload = (payload) =>
    fetch(`${api}/download`, {
        method: 'POST',
        headers,
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });


export const doStar = (payload) =>
    fetch(`${api}/star`, {
        method: 'POST',
        headers,
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });
export const doUnStar = (payload) =>
    fetch(`${api}/unstar`, {
        method: 'POST',
        headers,
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });

export const getUserLogs = (payload) =>
    fetch(`${api}/getUserLogs`, {
        method: 'POST',
        headers,
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });

export const setUserProfile = (payload) =>
    fetch(`${api}/setUserProfile`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });


export const getUserProfile = (payload) =>
    fetch(`${api}/getUserProfile`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });

export const validateEmails = (payload) =>
    fetch(`${api}/validateEmails`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });
export const getUserGrpups = (payload) =>
    fetch(`${api}/getUserGroups`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json()
    }).catch(err => {
            console.log("This is err");
            return err;
    });

export const setUserGroup = (payload) =>
    fetch(`${api}/setUserGroups`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log("This is err");
        return err;
    });