const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const downloadFile = (payload) =>
    fetch(`${api}/files/downloadFile`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    }).catch(err => {
        console.log("Error while downloading file..Try again");
        return err;
    });
