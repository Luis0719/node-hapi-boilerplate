#!/bin/bash -e
node ./scripts/preinstall.js

set -o pipefail
exec "$@"
