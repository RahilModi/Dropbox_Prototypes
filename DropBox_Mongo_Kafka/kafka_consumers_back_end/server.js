var connection = new require('./kafka/connection'),
    login = require('./services/auth/login'),
    signup = require('./services/auth/signup'),
    directoriesLogging = require('./services/fileoperations/directoriesLogging'),
    filelist = require('./services/fileoperations/listdir'),
    starDir = require('./services/user/staring'),
    files = require('./services/utils/files'),
    userprofile = require('./services/utils/userprofile'),
    permissions = require('./services/fileoperations/permissions'),
    usergroup = require('./services/user/usergroups');

var fs = require('fs');

var consumer_login = connection.getConsumer('login_topic'),
    consumer_signup = connection.getConsumer('signup_topic'),
    consumer_getdir = connection.getConsumer('getdir_topic'),
    consumer_uploadfile = connection.getConsumer('upload_file'),
    consumer_download_file = connection.getConsumer('download_file'),
    consumer_stardir = connection.getConsumer('stardir_topic'),
    consumer_mkdir = connection.getConsumer('mkdir_topic'),
    consumer_deldir = connection.getConsumer('deldir_topic'),
    consumer_user_profile = connection.getConsumer('user_profile_topic'),
    consumer_sharefile = connection.getConsumer('sharefile_topic'),
    consumer_usergroup = connection.getConsumer('usergroup_topic');

var producer = connection.getProducer();


consumer_login.on('message', function (message) {
    console.log('message received in login');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    login.handle_request(data.data, function (err, res) {
        console.log('after handle' + JSON.stringify(res));
        console.log('')
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            //console.log(data);
        });
        return;
    });
});


consumer_signup.on('message', function (message) {
    console.log('message received in signup');
    // console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    signup.afterSignUp(data.data, function (err, res) {
        //console.log('after handle 234 ',res);
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            // console.log(data);
        });
        return;
    });
});


consumer_uploadfile.on('message', function (message) {
    console.log('message received in upload file');
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    base64_decode(data.data.bufferdata, './uploads/' + data.data.parentpath + '/' + data.data.filename, function () {

        directoriesLogging.getDirectoryId(data.data.parentpath, function (err, res) {

            directoriesLogging.createDirectoryEntry(data.data.parentpath + '/' + data.data.filename, data.data.userid, 1, res.id, data.data.filename, data.data.parentpath, function (err, response) {
                var resData = {};
                if (err) {
                    resData.status = 401;
                } else {
                    resData.status = 201;
                }

                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    //console.log(data);
                });
                return;
            });
        });
    });
});


// function to create file from base64 encoded string
function base64_decode(base64str, file, callback) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
    callback(true)
}


consumer_getdir.on('message', function (message) {

    var data = JSON.parse(message.value);
    console.log(data);
    directoriesLogging.getDirectoryId(data.data.root, function (err, res) {
        console.log(res);
        filelist.listdir({root: data.data.root, userid: data.data.userid}, function (err, response) {
            console.log(JSON.stringify(response));
            console.log(data.replyTo);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: response
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                //console.log(data);
            });
            return;
        });

    });
});

consumer_stardir.on('message', function (message) {
    console.log('message received in stardir');
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    starDir.processStaring(data.data, function (err, res) {
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            //console.log(data);
        });
        return;
    });
});


consumer_mkdir.on('message', function (message) {
    console.log('message received in stardir');
    var data = JSON.parse(message.value);

    files.mkdir(data.data, function (err, res) {
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
        return;
    });
});


consumer_deldir.on('message', function (message) {
    console.log('message received in deldir');
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    files.delDir(data.data, function (err, res) {
        console.log("response data : ", res);
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            //console.log(data);
        });
        return;
    });
});


consumer_user_profile.on('message', function (message) {
    console.log('message received in get user profile');
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);


    userprofile.processUserData
    (data.data, function (err, res) {
        //console.log("response data : ",res)
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            //console.log(data);
        });
        return;
    });
});


consumer_sharefile.on('message', function (message) {
    console.log('message received in get share file');
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    permissions.processData(data.data, function (err, res) {
        //console.log("response data : ",res)
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            //console.log(data);
        });
        return;
    });
});

consumer_download_file.on('message', function (message) {
    console.log('message received in get share file');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    files.download(data.data, function (err, res) {
        console.log("response data : ", res)
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            //console.log(data);
        });
        return;
    });
});

consumer_usergroup.on('message', function (message) {
    console.log('message received in usergroup');
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);

    if (data.data.type == 'get') {
        usergroup.getAllUserGroups(function (err, res) {
            //console.log("response data : ", res)
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                //console.log(data);
            });
            return;
        });
    } else {
        usergroup.createUserGroup(data.data.group.groupName, data.data.userid, data.data.group.groupMembers, data.data.group.id, function (err, res) {
            console.log("response data : ", res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                //console.log(data);
            });
            return;
        })
    }
});
