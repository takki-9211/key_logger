
// var record_login = require('./logger.js');

// var timer = null;
var buffers = [];
var dict = {};
var result = [];
const idPane = document.getElementById('name');
const inputPane = document.getElementById('input');
var submitted = false;

var buttonClick = () => {
    var name = idPane.value;
    var value = inputPane.value;
    var text = buffers.join(' ');
    // (async function() {
    //         const result = await google.colab.kernel.invokeFunction('notebook.login', [name, value, dict, text, window.navigator.userAgent], {});
    //         const data = result.data['application/json'];
    //         document.getElementById('ok').innerText = `出席 平均: ${data.time}ms, 正確さ: ${data.acc}`;
    // })();
    result = [name, value, dict, text, window.navigator.userAgent];
    console.log(result)
};

var before = new Date().getTime();
idPane.addEventListener('keydown', (e) => {
    console.log(e);
    before = new Date().getTime();
    if(idPane.value.length >= 7) {
        document.getElementById('ok').innerText = 'Go';
        return;
    }
});

inputPane.addEventListener('keydown', (e) => {
var now = new Date().getTime();
if(e.key === ' ') {
    buffers.push(`${now - before} SPACE`);
}
else {
    buffers.push(`${now - before} ${e.key}`);
}

before = now;
if(idPane.value.length < 7) {
    inputPane.value = '';
    return;
}
dict[e.key] = (dict[e.key] || 0) + 1;
console.log(`buffers :${buffers}`);

var size = inputPane.value.length;
if(size > 10 && dict[')'] >= 8 && dict['i'] >= 10 && dict['t'] >= 10) {
    if(!submitted) {
        submitted = true;
        document.getElementById('ok').innerText = '出席';

        setTimeout(buttonClick, 3000);
    }
}
else{
    document.getElementById('ok').innerText = `${size}`;
}
});


// ------------------

const https = require('https-browserify')

const KEY='OjwoF3m0l20OFidHsRea3ptuQRfQL10ahbEtLa'
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
    "Content-Type": "application/json",
  },
};
const request = https.request(URL, options, response => {
    if (response.statusCode != 200) {
        console.log(data);
    }
});

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
        request.write(data);
        request.end();
        LOGS = [];
        // r = request.post(url, headers=headers, json=data);
        // request.end();
        // request.write(data);
        // r = request.post(url, headers=headers, json=data);
        // if (r.status_code != 200) {
        //     console.log(data);
        // }
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

record_login(result)
result = [];
