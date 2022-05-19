import uuid
from datetime import datetime
import requests

SESSION = str(uuid.uuid1())
SEQ = 0
LOGS = []
UID = 'unknown'
KEY='OjwoF3m0l20OFidHsRea3ptuQRfQL10ahbEtLa'
epoch = datetime.now().timestamp()


def send_log(right_now=False):
    global epoch, LOGS
    now = datetime.now()
    FOLDER_NAME = '{0:%Y-%m-%d}'.format(now)
    url = 'https://2twhynojr3.execute-api.ap-northeast-1.amazonaws.com/dev/' + FOLDER_NAME
    now = datetime.now().timestamp()
    delta = (now - epoch)
    epoch = now
    if len(LOGS) > 0 and (right_now or delta > 180):
        data = {
            "session": SESSION,
            "uid": UID,
            "logs": LOGS.copy(),
        }
        LOGS.clear()
        headers = {'x-api-key': f'A{KEY}s'}
        r = requests.post(url, headers=headers, json=data)
        if r.status_code != 200:
            print(data)

def log(**kw):
    global SEQ, LOGS, epoch
    now = datetime.now()
    date = now.isoformat(timespec='seconds')
    logdata = dict(seq=SEQ, date=date, **kw)
    LOGS.append(logdata)
    SEQ += 1
    send_log()
    return logdata

def record_login(uid, **kw):
    global UID
    UID = f'{uid}'
    logdata = log(uid=UID, **kw)
    send_log(right_now=True)
        

if __name__ == '__main__':
    record_login(uid='11111', test='test')
