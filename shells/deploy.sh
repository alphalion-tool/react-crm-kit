#!/bin/bash

if [[ "$PWD" =~ shells ]];then
    cd ../
fi

# (yarn install --production  && npm run build) || exit -1

pm2 start npm --name "react-crm-kit" --update-env -- run server 