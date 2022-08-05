
const URL = 'https://2twhynojr3.execute-api.ap-northeast-1.amazonaws.com/dev/';
const KEY = 'OjwoF3m0l20OFidHsRea3ptuQRfQL10ahbEtLa';

const headers = {
    'x-api-key': `A${KEY}s`,
    'Content-Type': 'application/json'
};

let SESSION = String(uuidv4());
let SEQ = 0;
let UID = 'unknown';
let LOGS = [];
let epoch = Date.now();

function send_log(right_now=false){
    let now = Date.now();
    let delta = (now - epoch);
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
    let now = new Date();
    date = now.toISOString();
    logdata = {
        'seq': SEQ, 
        'date': date,
        'uid': result.uid,
        'type': 'typing',
        'code': result.code,
        'keys': result.keys,
        'counts': result.counts,
        'time': result.time,
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

// 時間計算用
function _time() {
    let sum = 0;
    for (let i = 0; i < time.length; i++) {
      sum += time[i];
    }
    let mean_time = sum / time.length;
    return mean_time
}