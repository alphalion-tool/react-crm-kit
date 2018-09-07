#!/bin/bash

if [[ "$PWD" =~ shells ]];then
    cd ../
fi

node_modules/.bin/babel-node --max_old_space_size=3000 --plugins=css-modules-transform node_modules/.bin/babel-istanbul cover node_modules/.bin/jasmine JASMINE_CONFIG_PATH=jasmine.json