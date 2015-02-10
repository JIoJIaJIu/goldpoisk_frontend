#!/bin/bash
echo "Compiling project.."
npm install


./node_modules/bem/bin/bem make -m clean
./node_modules/bem/bin/bem make

rm -r desktop.bundles/merge
mkdir desktop.bundles/merge

bem decl merge \
    -d desktop.bundles/index/index.deps.js \
    -d desktop.bundles/items/items.deps.js \
    -d desktop.bundles/item/item.deps.js \
    -o desktop.bundles/merge/merge.deps.js

echo "Compiling techs.."
node compile.js

echo "Borschik"
mkdir -p desktop.bundles/merge/css
./node_modules/borschik/bin/borschik --input=desktop.bundles/merge/index.css --minimize=no  --output=desktop.bundles/merge/css/index.css
