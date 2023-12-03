import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import json 


samples = []
# with open("live_data_Wayne.csv") as f:
with open("live_data_Wayne1.csv") as f:
  f.readline()
  for line in f:
    try:
      samples.append(float(line.split(",")[1]))
    except:
      continue

samples = np.array(samples)
num_of_data = len(samples)

# Load the dataset
file_path = "live_data_Wayne1.csv"
data = pd.read_csv(file_path)
data_n = pd.read_csv(file_path)

# Converting 'Alpha' column to numeric and dropping NaNs
data['Alpha'] = pd.to_numeric(data['Alpha'], errors='coerce')
data.dropna(subset=['Alpha'], inplace=True)

# Calculating mean and standard deviation
alpha_mean = data['Alpha'].mean()
alpha_std = data['Alpha'].std()

# Spike detection threshold
# threshold = alpha_mean + 3 * alpha_std
threshold = 0.6
spikes = data[data['Alpha'] > threshold]
times = data['Alpha'] > threshold


# Converting 'Alpha' column to numeric and dropping NaNs
data_n['Alpha'] = -pd.to_numeric(data['Alpha'], errors='coerce')
data_n.dropna(subset=['Alpha'], inplace=True)

# Calculating mean and standard deviation
alpha_mean_n = data_n['Alpha'].mean()
alpha_std_n = data_n['Alpha'].std()

# Spike detection threshold
# threshold_n = alpha_mean_n + 3 * alpha_std_n
threshold_n = 0.72
spikes_n = data_n[data_n['Alpha'] > threshold_n]
times_n = data_n['Alpha'] > threshold_n


# Collect Spike data and define sleep time and quality
spikes_pos = np.array(spikes.index)
spikes_neg = np.array(spikes_n.index)
spikes_all = np.sort(np.concatenate((spikes_pos, spikes_neg)))

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
  # print(shallow_sleep_count)
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
    "good_sleep_time": sleep_time,
    "shallow_sleep_time": shallow_sleep_time,
    "good_sleep_percent": percent,
    "quality": result
}  
save_file = open("sleepData.json", "w")  
json.dump(value, save_file, indent = 6)  
save_file.close() 


# Plotting
plt.figure(figsize=(15, 6))
plt.plot(data['Alpha'], label='Alpha', color='blue')
plt.scatter(spikes.index, spikes['Alpha'], color='red', label='Spikes')
plt.scatter(spikes_n.index, -spikes_n['Alpha'], color='red')
plt.title('Alpha Column with Detected Spikes')
plt.xlabel('Index')
plt.ylabel('Alpha Value')
plt.legend()
#plt.show()
plt.savefig('dreamSpike_Wayne1.png')