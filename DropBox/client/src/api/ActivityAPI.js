const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const getActivity = (payload) =>
    fetch(`${api}/activity/${payload.userId}`, {
        method: 'GET',
        headers
        // body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(err => {
        console.log("Error while processing the request");
        return err;
    });