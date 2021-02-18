#!/bin/bash -e
echo "Running as $APP_ENV"

node ./scripts/preinstall.js

set -o pipefail
exec "$@"
