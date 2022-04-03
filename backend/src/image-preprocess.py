import cv2
# import numpy as np
from skimage.filters import threshold_local


def preprocess(path):

    img = cv2.imread(path)

    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    t = threshold_local(img, 17, offset=5, method='gaussian')
    img = (img > t).astype('uint8') * 255
    # thresh1 = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_MEAN_C,
    #                               cv2.THRESH_BINARY, 199, 5)

    # thresh2 = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    #                                cv2.THRESH_BINARY, 199, 5)

    # the window showing output images
    # with the corresponding thresholding
    # techniques applied to the input image
    # cv2.imshow('Adaptive Mean', thresh1)
    # cv2.imshow('Adaptive Gaussian', thresh2)

    cv2.imwrite(path, img)
