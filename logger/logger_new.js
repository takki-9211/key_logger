
const { v4: uuidv4 } = require('uuid');
// var request = require('request');
const https = require('https');

const KEY='OjwoF3m0l20OFidHsRea3ptuQRfQL10ahbEtLa'
// const headers = {'x-api-key': `A${KEY}s`};

const URL = 'https://2twhynojr3.execute-api.ap-northeast-1.amazonaws.com/dev/';

var SESSION = String(uuidv4);
var SEQ = 0;
var UID = 'unknown';
var LOGS = [];
var epoch = Date.now();

const options = {
  method: "POST",
  headers: {
    'x-api-key': `A${KEY}s`,
    // "Content-Type": "application/json",
  },
};
// const request = https.request(URL, options);
const request = https.request(URL, options, response => {
    if (response.statusCode != 200) {
        console.log(data);
    }
});

function send_log(right_now=False){
    now = Date.now();
    delta = (now - epoch);
    epoch = now;
    if (LOGS.length > 0 && (right_now || delta > 180)) {
        data = JSON.stringify({
            'session': SESSION,
            'uid': UID,
            'logs': Array.from(LOGS),
        });
        LOGS = [];
        request.write(data);
        // r = request.post(url, headers=headers, json=data);
        if (r.status_code != 200) {
            console.log(data);
        }
        // request.end();
    }
}

function log(kwargs){
    now = new Date();
    date = now.toISOString();
    logdata = {'seq':SEQ, 'date': date, kwargs};
    LOGS.append(logdata)
    SEQ += 1
    send_log()
    return logdata
}

function record_login(uid, kwargs){
    UID = uid;
    logdata = log(uid=UID, kwargs)
    send_log(right_now=True)       
}

if (require.main === module) {
    record_login({uid:'11111'}, {test:'test'});
}
