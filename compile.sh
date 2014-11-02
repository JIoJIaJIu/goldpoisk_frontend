#!/bin/bash
echo "Compiling project.."
npm install
./node_modules/bem/bin/bem make

echo "Borschik"
borschik --input=desktop.bundles/index/_index.css --minimize=no  --output=desktop.bundles/index/index.css 
