#!/usr/bin/env bash

# Delete All local tags. (Optional Recommended)
git tag -d $(git tag -l)
# Fetch remote All tags. (Optional Recommended)
git fetch
# Delete All remote tags.
# Note: pushing once should be faster than multiple times
git push origin --delete $(git tag -l)
# Delete All local tags.
git tag -d $(git tag -l)
