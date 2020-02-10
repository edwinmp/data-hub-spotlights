#!/usr/bin/env bash
## gets run on host server
# Instantly exists our script whenever an error occurs
set -e

# Where to deploy our site on our server
ASSETS_SOURCE_URL="http://178.128.102.213/"
cd ../build.zip
unzip build.zip
cd build || exit

# Build the docker image
docker stop datahub-spotlights
docker rm datahub-spotlights
docker rmi datahub-spotlights-image
docker build -t datahub-spotlights-image .
docker run -d -p 3000:3000 --name datahub-spotlights -e ASSETS_SOURCE_URL="$ASSETS_SOURCE_URL" datahub-spotlights-image:latest
# clean up scripts
cd ~
rm -rf deploy_spotlights
