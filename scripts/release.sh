#!/usr/bin/env bash

VERSION=$(node -p "require('./package.json').version")
TAG=v$VERSION
git tag -a $TAG -m "release version $VERSION"

if [ $? -eq 0 ]; then
  git push origin $TAG --follow-tags
else
  echo error: failed to tag build
fi
