const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const doAdd = (payload) =>
    fetch(`${api}/calc/add`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("This is error");
            return err;
        });


export const doSub = (payload) =>
    fetch(`${api}/calc/sub`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("This is error");
            return err;
        });



export const doMult = (payload) =>
    fetch(`${api}/calc/mul`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("This is error");
            return err;
        });



export const doDiv = (payload) =>
    fetch(`${api}/calc/div`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("This is error");
            return err;
        });