def data_split(s):

  data = s.split()

  # 文字のリスト作成
  s_list = data[3::2]

  # 数字のリスト作成
  num_list = data[2::2]

  return s_list, num_list

target = ['r', 'g', 'ArrowRight', ']', 'Backspace', 'Enter', 'h', '*', '[', '2', 'Shift', 'a', 'f', '0', 'ArrowLeft', 'e', 'u', '.', ')', 'm', 'd', 'i', 's', 'y', '(', 'p', 'b', ',', 't', 'n', '>', 'w', 'SPACE', 'x', 'l', 'o', '"', 'c', '=', '/']
print(len(target))

def keys_mean(target, s, n):

  flags = [int(0)]*len(target)
  times = [int(0)]*len(target)

  for i, item in enumerate(s):
    if item in target:
      ind = target.index(item)
      times[ind] += int(n[i])
      flags[ind] += 1
    else:
      pass

  return times, flags

def make_means(time, flag):
  item_mean = 0
  try:
    item_mean = time/flag
  except ZeroDivisionError:
    pass

  return item_mean

# 平均を出す

times, flags = keys_mean(target, s_list, num_list)

mean_list = []
tmp = []
for time, flag in zip(times, flags):
  tmp.append(make_means(time, flag))
mean_list.append(tmp)

import pandas as pd

someone = pd.DataFrame(mean_list, columns=target)
someone