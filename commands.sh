#!/usr/bin/env bash

# create lmdb
#~/Documents/caffe/build/tools/convert_imageset -shuffle imgs/test/ labels_test.txt sin_test_lmdb
#~/Documents/caffe/build/tools/convert_imageset -shuffle imgs/train/ labels.txt sin_train_lmdb
~/Documents/caffe/build/tools/convert_imageset -shuffle imgs/adjusted/test_grey/ imgs/adjusted/labels_test_0.txt sin_test_lmdb
~/Documents/caffe/build/tools/convert_imageset -shuffle imgs/adjusted/train_grey/ imgs/adjusted/labels_0.txt sin_train_lmdb

# run training
~/Documents/caffe/build/tools/caffe train -solver lenet_solver.prototxt 2>&1 | tee train.log

# graphs
~/Documents/caffe/tools/extra/plot_training_log.py.example 0 chart-0.png train.log

# model diagram
~/Documents/caffe/python/draw_net.py lenet_train_test.prototxt model.png