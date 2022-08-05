
const URL = 'https://2twhynojr3.execute-api.ap-northeast-1.amazonaws.com/dev/';
const KEY = 'OjwoF3m0l20OFidHsRea3ptuQRfQL10ahbEtLa';

const headers = {
    'x-api-key': `A${KEY}s`,
    'Content-Type': 'application/json'
};

var SESSION = String(uuidv4());
var SEQ = 0;
var UID = 'unknown';
var LOGS = [];
var epoch = Date.now();

function send_log(right_now=false){
    var now = Date.now();
    var delta = (now - epoch);
    epoch = now;
    if (LOGS.length > 0 && (right_now || delta > 180)) {
        data = JSON.stringify({
            'session': SESSION,
            'uid': UID,
            'logs': Array.from(LOGS),
        });
        console.log(data)
        
        fetch(URL, {
            method: 'POST', // or 'PUT'
            headers: headers,
            body: data,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        LOGS = [];
    }
}

function log(){
    var now = new Date();
    date = now.toISOString();
    logdata = {
        'seq': SEQ, 
        'date': date,
        'uid': result.uid,
        'type': 'typing',
        'code': result.code,
        'keys': result.keys,
        'counts': result.counts,
        'browser': result.browser
    };
    LOGS.push(logdata);
    console.log(LOGS);
    SEQ += 1;
    // send_log();
    return logdata
}

function record_login(){
    UID = result.uid;
    logdata = log()
    send_log(right_now=true)       
}

// if (require.main === module) {
//     record_login({uid:'11111'}, {test:'test'});
// }
