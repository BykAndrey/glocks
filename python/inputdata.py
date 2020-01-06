import os
from PIL import Image
import numpy as np


def getOnlyGrey(arr):
    output = np.array([])
    for i in range(len(arr)):
        if [arr[i][0]] != 0:
            output = np.append(output, [arr[i][0]*0.001])
        else:
            output = np.append(output, 0)
    return output


def getListColors(path):
    img = Image.open(path)

    output = []
    px = img.load()
    for i in range(img.size[0]):
        for j in range(img.size[0]):
            output.append(px[i, j])
    return getOnlyGrey(np.array(output))


def main():
    getListColors()


if __name__ == "__main__":
    main()
