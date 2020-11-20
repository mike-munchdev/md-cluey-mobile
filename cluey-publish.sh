#!/bin/bash
if [[ $# -ne 2 ]] ; then
    echo 'usage cluey-publish <release_channel> <path_to_config>'
else
    # release_channel example test-v1-3
    # path_to_config example ./app.test.json
    expo publish --release-channel $1  --config $2
fi
