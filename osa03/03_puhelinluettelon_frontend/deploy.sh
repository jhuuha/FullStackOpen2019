#!/bin/sh
npm run build
rm -rf ../../../Tehtavat_osa03/build
cp -r build/ ../../../Tehtavat_osa03/
