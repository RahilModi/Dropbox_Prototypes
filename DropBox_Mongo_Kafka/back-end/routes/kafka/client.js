var rpc = new (require('./rpc'))();

function make_request(topic, msg_payload, callback){
    console.log('in make request');
    console.log(topic);
    console.log(msg_payload);

    rpc.makeRequest(topic, msg_payload, function(err, response){

        if(err)
            console.error(err);
        else{
            callback(null, response);
        }
    });
}

exports.make_request = make_request;