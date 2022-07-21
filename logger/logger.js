
// const { v4: uuidv4 } = require('uuid');
// import { v4 as uuidv4 } from 'uuid';

const URL = 'https://2twhynojr3.execute-api.ap-northeast-1.amazonaws.com/dev/';
const KEY = 'OjwoF3m0l20OFidHsRea3ptuQRfQL10ahbEtLa';

var SESSION = String(uuidv4);
var SEQ = 0;
var UID = 'unknown';
var LOGS = [];
var epoch = Date.now();

function send_log(right_now=false){
    now = Date.now();
    delta = (now - epoch);
    epoch = now;
    if (LOGS.length > 0 && (right_now || delta > 180)) {
        data = JSON.stringify({
            'session': SESSION,
            'uid': UID,
            'logs': Array.from(LOGS),
        });
        const method = "POST";
        const headers = {
            'x-api-key': `A${KEY}s`,
            // 'Content-Type': 'application/json'
        };
        fetch(URL, {method, headers: headers, data})
        .then((res)=> res.json())
        .then(console.log)
        .catch(console.error);
        LOGS = [];
    }
}

function log(kwargs){
    now = new Date();
    date = now.toISOString();
    logdata = {'seq':SEQ, 'date': date, kwargs};
    LOGS.push(logdata);
    SEQ += 1;
    send_log();
    return logdata
}

function record_login(uid, kwargs){
    UID = uid;
    logdata = log(uid=UID, kwargs)
    send_log(right_now=true)       
}

// if (require.main === module) {
//     record_login({uid:'11111'}, {test:'test'});
// }
