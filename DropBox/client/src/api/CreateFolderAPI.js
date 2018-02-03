const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const createFolder = (payload) =>
    fetch(`${api}/folder/createFolder`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(err => {
        console.log("Error in creating folder...Try Again");
        return err;
    });
