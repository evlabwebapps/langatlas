#!/bin/sh

yarn build

docker build --tag aamirov/evlabwebapps-langatlas:latest .
docker push aamirov/evlabwebapps-langatlas:latest
