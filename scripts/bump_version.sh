#! /usr/bin/env bash

shopt -s extglob

yarn config set version-git-tag false
yarn config set version-tag-prefix ""

case $1 in
[Pp]atch/?* | [Hh]otfix/?* | [Bb]ugfix/?*)
  yarn version --patch
  ;;
[Ff]eature/?*)
  yarn version --minor
  ;;
# Major incremented manually
!([Mm]ajor/?*))
  echo "error: invalid commit message pattern"
  exit 1
  ;;
esac
