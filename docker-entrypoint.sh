#!/bin/bash -e
node ./scripts/preinstall.js

ENV_FILE="$(pwd)/.env"
if [ -f "$ENV_FILE" ]; then
  for ENV_VAR in $(cat "$ENV_FILE"); do
    VAR="$(echo "$ENV_VAR" | cut -d '=' -f 1)"
    if ! $(env | cut -d '=' -f 1 | grep "^$VARIABLE\$" > /dev/null); then
      export ${ENV_VAR?}
    fi
  done
fi

set -o pipefail
exec "$@"
