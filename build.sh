#!/bin/bash
echo "install dependencies"
yarn install

echo "Clearing old build files..."
rm -rf build.zip build

echo "Building..."

yarn build

echo "Build complete... bundling..."

mkdir build && mv .next build/ && mv dist/* build/ && mv package.json build/ && mv yarn.lock build/ && mv Dockerfile build/

zip -q -r build.zip build

echo "Bundling complete..."

echo "returning repo to original state"

git reset .

git checkout .

rm -rf build

echo "DONE!"
