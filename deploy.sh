#!/bin/bash
## gets run on host server

mkdir -p ~/datahub-spotlights
cd ~/datahub-spotlights || exit

rm -rf build.zip build

wget https://github.com/devinit/data-hub-spotlights/releases/download/$1/build.zip

echo 'Downloaded tag: $tag'

unzip build.zip

cd build || exit

docker build -t datahub-spotlights-tag .

docker stop datahub-spotlights

docker rm datahub-spotlights

docker run -it -d -p 3000:3000 --name datahub-spotlights datahub-spotlights-tag
