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

GITHUB_TOKEN=$1
# Ensure that the GITHUB_TOKEN secret is included
if [[ -z "$GITHUB_TOKEN" ]]; then
  echo "Set the GITHUB_TOKEN env variable."
  exit 1
fi

#echo "Release to github"

# Upload the artifact
#curl -X POST -H "Content-Type:application/octet-stream" --data-binary @build.zip https://uploads.github.com/repos/devinit/data-hub-spotlights/releases/v0.1.0/assets?name=build.zip

echo "returning repo to original state"

git reset .
git checkout .

rm -rf build

echo "DONE!"
