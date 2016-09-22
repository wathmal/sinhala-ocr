# sinhala-ocr

this is no way near an OCR. this project contains some perfect test images of sinhala characters (generated) and some test CNN (convolution neural network) model to train the data set in order to identify images with sinhala characters.

here we have used `caffe` for implementing and training the network. **do anything you want with the provided dataset.**



## directory structure
```
.
├── commands.sh                 # contains useful caffe commands
├── imgs                        # dataset
│   ├── adjusted                # traing images with label files (TRAIN & TEST phase)
│   ├── labels_unicode.txt
│   └── unicode                 # a new dataset to evaluvate trained model
├── lenet.prototxt              # TEST model
├── lenet_solver.prototxt       # caffe solver
├── lenet_train_test.prototxt   # TRAIN model
├── map.txt                     # mapping of labels / unicode char / other sinhala fonts
├── model                       # output models / solverstate directory
├── node_modules
├── README.md
├── test.py                     # pythin script to evaluvate trained model
└── textgen.js                  # script to generate sinhala chars

```

## generating database files

## training

ones you have defined `lenet_train_test.prototxt` and configured solver `lenet_solver.prototxt` start training using following commands.

view `commands.sh` file.

## evaluating
use the `test.py` to test the trained model on your new images.




## generate sinhala chars

### installation
```
sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
```

### running the script
you need to have all the fonts mentioned in the code installed in your system. make sure font names don't have any spaces or escape characters.

```
npm install
node textgen.js
```

created image will be saved in `imgs/` directory.
