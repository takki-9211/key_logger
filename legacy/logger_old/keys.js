
var timer = null;
var buffers = [];
var dict = {};
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
    console.log([name, value, dict, text, window.navigator.userAgent])
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