const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const performLogin = (payload) =>
    fetch(`${api}/login/doLogIn`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res.status);
        return res.status;
    }).catch(err => {
        console.log("Error while trying to login");
        return err;
    });