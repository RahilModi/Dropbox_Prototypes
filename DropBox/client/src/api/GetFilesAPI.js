const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const getFiles = (payload) =>
    fetch(`${api}/files/getfiles`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(err => {
        console.log("Error in processing request..");
        return err;
    });

export const getSharedFiles = (payload) =>
    fetch(`${api}/files/getshared`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(err => {
        console.log("Error while retrieving shared files..");
        return err;
    });


export const ShareFile = (payload) =>
    fetch(`${api}/files/setSharing`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(err => {
        console.log("Error while sharing the file..try again..");
        return err;
    });
