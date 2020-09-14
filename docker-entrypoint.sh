#!/bin/bash -e

export PATH="${PWD}/node_modules/.bin":$PATH

# Loan custom dependencies defined at package.json
node ./scripts/preinstall.js

# Loan non-secret environment variables
ENV_FILE="$(pwd)/config/$APP_ENV.env"

for ENV_VAR in $(cat "$ENV_FILE"); do
  VAR="$(echo "$ENV_VAR" | cut -d '=' -f 1)"
  if ! $(env | cut -d '=' -f 1 | grep "^$VARIABLE\$" > /dev/null); then
    export ${ENV_VAR?}
  fi
done

# Loan secret environment variables
ENV_FILE="$(pwd)/.env"

for ENV_VAR in $(cat "$ENV_FILE"); do
  VAR="$(echo "$ENV_VAR" | cut -d '=' -f 1)"
  if ! $(env | cut -d '=' -f 1 | grep "^$VARIABLE\$" > /dev/null); then
    export ${ENV_VAR?}
  fi
done

set -o pipefail
exec "$@" | sed "s#/usr/src/app/#./#g"
