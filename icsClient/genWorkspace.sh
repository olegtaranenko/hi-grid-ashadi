#!/bin/bash
#
#
#

# call the setupEnv script to set the path variables used for sencha, ruby etc
#source setupEnv.sh

echo "Cmd hack (temporary rename packages)..."
if [ -e packages ]; then 
    rm -rf packages
fi
mkdir packages

if [ -e .sencha ]; then
    echo removing directory .sencha
    rm -rf .sencha;
fi


echo "Generate workspace..."
sencha -sdk ../../../ExtJS/src generate workspace --path .

echo "Restore packages (cmd bug)..."
rm -rf packages
rm -rf src

echo "link ext sub-folders (cmd bug)..."
ln -nfs ./ext/src src
ln -nfs ./ext/packages packages
