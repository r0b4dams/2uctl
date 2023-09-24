#!/usr/bin/env bash

# update the README npm badge to the latest version

INPUT="README.md"
OUTPUT="README_TMP.md"

PKG_NAME=$(node -p "require('./package.json').name")
PKG_VERSION=$(node -p "require('./package.json').version")
PKG_URL="https://www.npmjs.com/package/$PKG_NAME"

BADGE_ID="npm_badge"
BADGE_URL="https://img.shields.io/badge/npm-v$PKG_VERSION-blue.svg?logo=npm"
BADGE_MD="[![npm_badge]($BADGE_URL)]($PKG_URL)"

while IFS= read -r line; do
    case $line in
    *$BADGE_ID*)
        echo $BADGE_MD >>$OUTPUT
        ;;
    *)
        echo $line >>$OUTPUT
        ;;
    esac
done <$INPUT

mv $OUTPUT $INPUT
