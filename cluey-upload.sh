#!/bin/bash
if [[ $# -ne 2 ]] ; then
    echo 'usage cluey-upload <platform> <path_to_config>'
else
    # path_to_config example ./app.test.json
    # expo upload:ios --config ./app.test.json
    expo upload:$1  --config $2
fi


