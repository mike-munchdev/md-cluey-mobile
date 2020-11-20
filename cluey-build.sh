#!/bin/bash
if [[ $# -ne 3 ]] ; then
    echo 'usage cluey-build <platform> <release_channel> <path_to_config>'
else
    # release_channel example test-v1-3
    # path_to_config example ./app.test.json
    expo build:$1 --release-channel $2  --config $3
fi
