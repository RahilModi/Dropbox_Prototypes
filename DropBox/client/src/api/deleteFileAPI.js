const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const deleteFile = (fileId) =>
    fetch(`${api}/files/deleteFile/${fileId}`, {
        method: 'DELETE',
        headers
        //body: JSON.stringify(fileId)
    }).then(res => {
        return res;
    }).catch(err => {
        console.log("Error while deleting the file..Try again");
        return err;
    });