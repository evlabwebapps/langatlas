#!/bin/sh

yarn build

sudo docker build --tag fedorenkolanguagelab/evlabwebapps-langatlas:latest .
sudo docker push fedorenkolanguagelab/evlabwebapps-langatlas:latest
