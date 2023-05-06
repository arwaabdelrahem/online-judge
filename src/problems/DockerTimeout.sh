#!/bin/bash

# option instructs bash to immediately exit if any command [1] has a non-zero exit status.
# You wouldn't want to set this for your command-line shell, but in a script it's massively helpful.
set -e
to=$1

# shift is a bash built-in which kind of removes arguments from the beginning of the argument list.
# Given that the 3 arguments provided to the script are available in $1, $2, $3, then a call to shift will make $2 the new $1.
# A shift 2 will shift by two making new $1 the old $3
shift

cont=$(docker run -d "$@")
code=$(timeout "$to" docker wait "$cont" || true)
# timeout 60s docker wait b3d2e1cdd4375af4429c4b9e8cc3ef36918ce301b9b2686da7a57db98e30d916
# docker kill $cont &> /dev/null

# -n option to disable the insertion of a new line.
echo -n 'status: ' # Result=> status: timeout OR status: exited:0

# -z => returns true if length of $code is zero
# if $code is true "length zero" then timeout
if [ -z "$code" ]; then
    echo timeout
else
    echo exited: $code
fi

echo output:
# pipe to sed simply for pretty nice indentation
docker logs $cont | sed 's/^/\t/'

# Sometimes we will need to execute a command, but we don't want the output displayed on the screen
# remove the container and discard output 
docker rm $cont &> /dev/null
