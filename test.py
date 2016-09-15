# -*- coding: utf-8 -*-

import sys
import caffe
import cv2
import Image
import matplotlib
import numpy as np
import lmdb
matplotlib.rcParams['backend'] = "Qt4Agg"

caffe_root = '/home/wathmal/Documents/caffe'

MODEL_FILE = './lenet.prototxt'
PRETRAINED = './model/lenet_iter_600.caffemodel'

sin_labels = ['ක','ඛ', 'ග', 'ඝ', 'ඟ', 'ච', 'ඡ', 'ජ', 'ට', 'ඩ', 'න', 'ණ', 'ත', 'ථ', 'ද', 'ධ', 'ප', 'ඵ', 'බ', 'භ', 'ම', 'ඹ', 'ය', 'ර', 'ල', 'ව', 'ශ', 'ෂ', 'ස','හ','ළ', 'ෆ']

net = caffe.Net(MODEL_FILE, PRETRAINED,caffe.TEST)
caffe.set_mode_cpu()
# Test self-made image
img = caffe.io.load_image('/home/wathmal/WebstormProjects/ML/imgs/unicode/noto_sans_sinhala_bold_29.png', color=False)
img = img.astype(np.uint8)
out = net.forward_all(data=np.asarray([img.transpose(2,0,1)]))
# print out['prob'][0]
sorted_indices = np.flipud(np.argsort(out['prob'][0]))
# print sorted_indices

for x in range(0, 5):
    print "label is %s with %.4f prob" % (sin_labels[sorted_indices[x]], out['prob'][0][sorted_indices[x]])

# predicted_label = out['prob'][0].argmax(axis=0)
# print predicted_label
print "predicted label: %d [ %s ]" % (sorted_indices[0], sin_labels[sorted_indices[0]])

# db_path = './sin_test_lmdb'
# lmdb_env = lmdb.open(db_path)
# lmdb_txn = lmdb_env.begin()
# lmdb_cursor = lmdb_txn.cursor()
# count = 0
# correct = 0
# for key, value in lmdb_cursor:
#     # print "Count:"
#     # print count
#     count = count + 1
#     datum = caffe.proto.caffe_pb2.Datum()
#     datum.ParseFromString(value)
#     label = int(datum.label)
#     image = np.zeros((datum.channels, datum.height, datum.width))
#     image = caffe.io.datum_to_array(datum)  
#     image = image.transpose()
#     out = net.forward_all(data=np.asarray([image.transpose(2,0,1)]))
#     predicted_label = out['prob'][0].argmax(axis=0)
#     # print out['prob']
#     # print predicted_label
#     if label == predicted_label:
#         correct = correct + 1
#     print("Label is class " + str(label) + ", predicted class is " + str(predicted_label))

# print(str(correct) + " out of " + str(count) + " were classified correctly")