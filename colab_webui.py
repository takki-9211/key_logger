import IPython
from IPython.display import display, HTML
from google.colab import output
# from .logger import load_slack, kogi_print, log, send_log, print_nop, record_login

# def debug_log():
#     try:
#         send_log()
#     except Exception as e:
#         kogi_print(e)

# LOGIN


# ダミー関数
LOGIN_HTML = '''
<style>
.parent {
  background-color: #edebeb;
  width: 100%;
  height: 150px;
}
textarea {
  width: 100%; 
  box-sizing: border-box;  /* ※これがないと横にはみ出る */
  height:120px; 
  font-size: large;
  outline: none;           /* ※ブラウザが標準で付加する線を消したいとき */
  resize: none;
}
.box16{
    background: -webkit-repeating-linear-gradient(-45deg, #f0f8ff, #f0f8ff 3px,#e9f4ff 3px, #e9f4ff 7px);
    background: repeating-linear-gradient(-45deg, #f0f8ff, #f0f8ff 3px,#e9f4ff 3px, #e9f4ff 7px);
}
.box18{
  color: #565656;
  background: #ffeaea;
  border: dashed 2px #ffc3c3;
}
.box24 {
    position: relative;
    padding: 0.5em 0.7em;
    margin: 2em 0;
    background: #6f4b3e;
    color: white;
    font-weight: bold;
}
.button02 {
  width: 300px;
  color: #333;
  font-weight: 700;
  background-color: #cccccc;
  border-radius: 50vh;
}
</style>
<label>Student ID</label><input id="name"/>
<span class="button02" id="ok">Ready</span>
<div class="parent">
<div style="float: left; width: 48%; text-align: right;">
<label class="box24" for="outout">Code</label>
<textarea id="output" class="box18 python" readonly>print(math.sin(math.pi/2))
print(["oranges", "tables"])
print(weight / (height * height))
print(x if x >= y else y)
print(s[0].upper() for s in "abcdefg")
</textarea>
</div>
<div style="float: left; width: 48%; text-align: right;">
<label class="box24" for="input">Type In</label>
<textarea id="input" class="box16"></textarea>
</div>
</div>
'''

LOGIN_SCRIPT = '''
<script>
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
        google.colab.kernel.invokeFunction('notebook.login', [name, value, dict, text, window.navigator.userAgent], {});
        (async function() {
            const result = await google.colab.kernel.invokeFunction('notebook.login', [name, value, dict, text, window.navigator.userAgent], {});
            const data = result.data['application/json'];
            document.getElementById('ok').innerText = `出席 平均: ${data.time}ms, 正確さ: ${data.acc}`;
        })();
    };
    var before = new Date().getTime();
    idPane.addEventListener('keydown', (e) => {
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
</script>
'''


# def _time(keys):
#     times = [int(t) for t in keys.split() if t.isdigit()]
#     return (sum(times) - max(times)) // (len(times) - 1)


# CODE = '''print(math.sin(math.pi/2))
# print(["oranges", "tables"])
# print(weight / (height * height))
# print(x if x >= y else y)
# print(s[0].upper() for s in "abcdefg")'''


# def _accuracy(code):
#     import difflib
#     return difflib.SequenceMatcher(None, code.strip(), CODE).ratio()


# def kogi_login(ai_key=None, class_name='unknown', slack_key=None, print=print_nop):
#     def login(name, code, counts, keys, useragent):
#         try:
#             code = code.strip()
#             acc = round(_accuracy(code), 3)
#             time = round(_time(keys), 3)
#             keys = keys.split('\n')[-1]
#             print(keys)
#             record_login(type='typing',
#                          uid=name, class_name=class_name,
#                          code=code, keys=keys,
#                          mean_time=time, accuracy=acc,
#                          counts=counts, browser=useragent)
#             return IPython.display.JSON({'acc': acc, 'time': time})
#         except Exception as e:
#             kogi_print(e)

#     output.register_callback('notebook.login', login)
#     display(IPython.display.HTML(LOGIN_HTML))
#     display(IPython.display.HTML(LOGIN_SCRIPT))
#     load_slack(slack_key)
#     if ai_key is not None:
#         try:
#             kogi_enable_ai(ai_key, start_loading=True)
#         except Exception as e:
#             print('Disabled AI', e)
#             kogi_enable_ai(None, start_loading=True)