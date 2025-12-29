#!/bin/bash

TARGET_DIR="/Volumes/TRANSDUCER/麻醉/离线部署相关/airway-evaluation-fe"
# TARGET_DIR="/Volumes/mydisk/清华/anesthesia-chat-fe"
mkdir -p $TARGET_DIR


cp -r dist $TARGET_DIR
cp move.sh $TARGET_DIR/move.sh