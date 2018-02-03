const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const doSignup = (payload) =>
    fetch(`${api}/signup/doSignUp`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });