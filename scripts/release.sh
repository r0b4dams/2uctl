#!/usr/bin/env bash

VERSION=$(node -p "require('./package.json').version")
TAG=v$VERSION
git tag -a $TAG -m "release version $VERSION"
git push origin $TAG
