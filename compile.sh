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
    -o desktop.bundles/merge/merge.deps.js

LEVELS="-l bem-core/common.blocks \
        -l bem-core/desktop.blocks \
        -l min.blocks -l desktop.blocks"

echo "Building css"
bem build $LEVELS\
    -d desktop.bundles/merge/merge.deps.js -T node_modules/bem/lib/techs/v2/css.js \
    --force -o desktop.bundles/merge -n merge

echo "Building bemhtml"
bem build $LEVELS\
    -d desktop.bundles/merge/merge.deps.js -T bem-core/.bem/techs/bemhtml.js \
    --force -o desktop.bundles/merge -n merge

echo "Building priv.js"
bem build $LEVELS\
    -d desktop.bundles/merge/merge.deps.js -T .bem/techs/priv.js.js \
    -o desktop.bundles/merge -n merge

echo "Borschik"
mkdir -p desktop.bundles/merge/css
./node_modules/borschik/bin/borschik --input=desktop.bundles/merge/merge.css --minimize=no  --output=desktop.bundles/merge/css/index.css
