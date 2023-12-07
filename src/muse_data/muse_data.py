import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import json 
from scipy.stats import norm
from datetime import datetime
import time


dt = time.strftime("%Y-%m-%d-%H-%M-%S")
samples = []
file_path = "live_data_Wayne.csv"
with open(file_path) as f:
  f.readline()
  for line in f:
    try:
      samples.append(float(line.split(",")[1]))
    except:
      continue

samples = np.array(samples)
num_of_data = len(samples)


# Load the dataset
data = pd.read_csv(file_path)
data_n = pd.read_csv(file_path)

# Converting 'Alpha' column to numeric and dropping NaNs
data['Alpha'] = pd.to_numeric(data['Alpha'], errors='coerce')
data.dropna(subset=['Alpha'], inplace=True)

data_a = data['Alpha']

# Compute mean and standard deviation
mean, std = np.mean(data_a), np.std(data_a)
threshold = mean+3*std
threshold_n = mean-3*std
spikes = data_a[data_a > threshold]
times = data_a > threshold

spikes_n = data_a[data_a < threshold_n]
times_n = data_a > threshold_n

# Collect Spike data and define sleep time and quality
spikes_pos = np.array(spikes.index)
spikes_neg = np.array(spikes_n.index)
spikes_all = np.sort(np.concatenate((spikes_pos, spikes_neg)))

data['Timestamp'] = pd.to_numeric(data['Timestamp'], errors='coerce')
data.dropna(subset=['Timestamp'], inplace=True)
data_time = data['Timestamp']
timestamps = []
for i, timestamp in enumerate(data_time):
  timestamp = datetime.fromtimestamp(timestamp)
  timestamp = timestamp.strftime("%H-%M-%S")
  timestamps.append(timestamp)


timestamp_spikes = []
timestamp_spikes_n = []
for i in spikes.index:
  timestamp_spikes.append(timestamps[i])
# print(timestamp_spikes)
for i in spikes_n.index:
  timestamp_spikes_n.append(timestamps[i])
# print(timestamp_spikes_n)


def is_good_sleep(allSpike, i):
  start = i-750
  end = i+750
  count = 0
  for spike in allSpike:
    if spike>end:
      break
    if start<=spike<=end:
      count+=1
  if count<7:
    return 1
  else:
    return 0

def GoodSleepTime(allSpike, num_of_data):
  boolean_sleep_array = np.zeros(num_of_data)
  sleep_count = 0
  shallow_sleep_count = 0
  sleep_time = 0
  shallow_sleep_time = 0
  for i in range(num_of_data):
    if i<750 or i>num_of_data-750:
      boolean_sleep_array[i] = 0
      continue
    else:
      result = is_good_sleep(allSpike, i)
      boolean_sleep_array[i] = result
      if result==1:
        sleep_count+=1
  
  sleep_time = round(sleep_count/5/60/60, 2)
  shallow_sleep_count = num_of_data-sleep_count
  shallow_sleep_time = round(shallow_sleep_count/5/60/60, 2)
  return sleep_count, shallow_sleep_count, sleep_time, shallow_sleep_time, boolean_sleep_array

def sleepQuality(num_of_good, num_of_data):
  percent = num_of_good/num_of_data
  if 0.9<=percent<=1:
    return round(percent*100,2), "Excellent"
  if 0.7<=percent<0.9:
    return round(percent*100,2), "Good"
  if 0.6<=percent<0.7:
    return round(percent*100,2), "Normal"
  else:
    return round(percent*100,2), "Need better sleep"

sleep_count, shallow_sleep_count, sleep_time, shallow_sleep_time, boolean_sleep_array = GoodSleepTime(spikes_all, num_of_data)
percent, result = sleepQuality(sleep_count, num_of_data)


# Store data into json file
value ={  
    "date": dt,
    "good_sleep_time": sleep_time,
    "shallow_sleep_time": shallow_sleep_time,
    "good_sleep_percent": percent,
    "quality": result,
    "graph": f"{dt}.png"
}  
save_file = open(f"{dt}.json", "w")  
json.dump(value, save_file, indent = 6)  
save_file.close() 

# Plotting
plt.figure(figsize=(15, 6))
plt.xticks(np.arange(0, len(data_a), len(data_a)//40))
plt.plot(timestamps, data_a, label='Alpha', color='blue')
plt.scatter(timestamp_spikes, spikes, color='red', label='Spikes')
plt.scatter(timestamp_spikes_n, spikes_n, color='red')
plt.margins(x=0)
# plt.axhline(y = threshold, color = 'r', linestyle = '-') 
# plt.axhline(y = threshold_n, color = 'r', linestyle = '-') 
plt.title('Alpha Column with Detected Spikes')
plt.xlabel('Sleeping Time')
plt.ylabel('Alpha Value')
plt.legend()
#plt.show()
plt.savefig(f'{dt}.png')