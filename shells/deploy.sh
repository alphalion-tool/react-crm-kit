#!/bin/bash

if [[ "$PWD" =~ shells ]];then
    cd ../
fi

servers=(172.28.49.2:8888)

(yarn install --production  && npm run build) || exit -1