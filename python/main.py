
import os
import numpy as np
from inputdata import getListColors
from network import trainData, initWeights, pred

DIR = os.path.dirname(os.path.realpath(__file__))
FILE_NAME = ["1.png", '2.png', '3.png']
IMAGE_PATH = np.array([])
for i in range(len(FILE_NAME)):
    IMAGE_PATH = np.append(IMAGE_PATH, os.path.join(DIR, FILE_NAME[i]))
print(IMAGE_PATH)
list_data = []
for i in range(len(IMAGE_PATH)):
    li = getListColors(IMAGE_PATH[i])
    # print('li', li)
    list_data.append(li)
# print(len(list_data))

#
# print(list_data)
# list_data = [[1, 1, 1], [0, 1, 1], [1, 0, 0]]
inputs = np.array(list_data)
goals = np.array([[0], [.5], [1]])
# print(inputs)
initWeights(len(inputs[0]))
trainData(inputs, goals)
print(pred(np.array([list_data[0]])))
print(pred(np.array([list_data[1]])))
print(pred(np.array([list_data[2]])))
