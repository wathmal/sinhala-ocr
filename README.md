# Sinhala-OCR

This project is not an OCR. Instead, it contains a dataset of perfect test images of Sinhala characters that were generated, along with a test Convolutional Neural Network (CNN) based on LeNet. The purpose is to train the dataset to identify images that contain Sinhala characters. Caffe was used to implement and train the network. Feel free to use the provided dataset for your own purposes.

## Directory Structure

```
.
├── commands.sh                 # contains useful Caffe commands
├── imgs                        # dataset
│   ├── adjusted                # training images with label files (TRAIN & TEST phase)
│   ├── labels_unicode.txt
│   └── unicode                 # a new dataset to evaluate the trained model
├── lenet.prototxt              # TEST model
├── lenet_solver.prototxt       # Caffe solver
├── lenet_train_test.prototxt   # TRAIN model
├── map.txt                     # mapping of labels / Unicode char / other Sinhala fonts
├── model                       # output models / solverstate directory
├── node_modules
├── README.md
├── test.py                     # Python script to evaluate the trained model
└── textgen.js                  # script to generate Sinhala characters

```

## Generating Database Files

### Training

Once you have defined `lenet_train_test.prototxt` and configured solver `lenet_solver.prototxt`, start training using the following commands. You can view `commands.sh` file for useful Caffe commands.

### Evaluating

Use `test.py` to test the trained model on your new images.

## Generate Sinhala Characters

### Installation

To generate Sinhala characters, you need to install the following dependencies:

```
sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
```

### Running the Script

Make sure all the fonts mentioned in the code are installed on your system and that font names don't have any spaces or escape characters. To generate Sinhala characters, run the following commands:

```
npm install
node textgen.js
```

The created image will be saved in `imgs/` directory.
