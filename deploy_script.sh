#!/usr/bin/env bash
## gets run on host server
# Instantly exists our script whenever an error occurs
set -e

# Where to deploy our site on our server
cd ../build.zip
unzip build.zip
cd build || exit

# Build the docker image
docker build -t datahub-spotlights-image .
docker stop datahub-spotlights
docker rm datahub-spotlights
docker run -d -p 3000:3000 --name datahub-spotlights -e ASSETS_SOURCE_URL="178.128.102.213" datahub-spotlights-image:latest
# clean up scripts
cd ~
rm -rf deploy_spotlightsbuild.zip buildbuild.zip build
