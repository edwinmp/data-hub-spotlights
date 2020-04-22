#!/usr/bin/env bash
# Instantly exists our script whenever an error occurs
set -e

# Where to deploy our site on our server
cd ../build.zip
unzip -o build.zip
cd build || exit

# Build the docker image
if [ ! "$(docker ps -q -f name=nodejs)" || "$(docker ps -aq -f status=exited -f name=nodejs)" ]; then
    # cleanup
    docker stop nodejs
    docker rm nodejs
    docker rmi build_nodejs
fi

# run container
docker-compose build
docker-compose up -d

# clean up scripts
cd ~
rm -rf deploy_spotlights