#!/bin/bash

# Finds the provided GUID in the files

GUID=$1

if [[ "$GUID" != *"-"* ]]; then
  GUID=$(node tools/guid.js $GUID)
fi

if ! [ -x "$(command -v rg)" ]; then
  grep -nir $GUID FSD
else
  rg -i $GUID FSD
fi
