// node logger_test.jsで多分S3に入ってる

const https = require('https');

const KEY='OjwoF3m0l20OFidHsRea3ptuQRfQL10ahbEtLa'
const ID1 = '2twhynojr3';
const AREA = 'ap-northeast-1';
const URL = `https://${ID1}.execute-api.${AREA}.amazonaws.com/dev/`;

const options = {
  method: "POST",
  headers: {
    'x-api-key': `A${KEY}s`,
    "Content-Type": "application/json",
  },
};
// const request = https.request(URL, options);
const request = https.request(URL, options, response => {
    if (response.statusCode != 200) {
        console.log(data);
    }
});

if (require.main === module) {
    data = JSON.stringify({
        uid: '11111',
        test: 'test'
    });
    request.write(data);
    request.end();
}
