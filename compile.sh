#!/bin/bash
echo "Compiling project.."
npm install
./node_modules/bem/bin/bem make -m clean
./node_modules/bem/bin/bem make

echo "Borschik"
mkdir desktop.bundles/index/css -p
./node_modules/borschik/bin/borschik --input=desktop.bundles/index/_index.css --minimize=no  --output=desktop.bundles/index/css/index.css
