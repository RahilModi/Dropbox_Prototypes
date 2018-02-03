const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const getUser = (payload) =>
    fetch(`${api}/user/${payload.emailId}`, {
        method: 'GET',
        headers
        // body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(err => {
        console.log("Error in processing. Try again..");
        return err;
    });
