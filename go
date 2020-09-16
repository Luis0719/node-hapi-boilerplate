#!/bin/bash

set -e

NAME=`cat package.json | python -c "import json,sys;obj=json.load(sys.stdin);print obj['name']"`

DEV_IMAGE=api_dev
# Executables
DC=docker-compose
DM=docker-machine
D=docker
DC_RUN_PARAMS="--rm"

## Exported docker name
D_NS=esperanzastours
D_IMAGE_NAME=${NAME}
D_PROD_IMAGE=${D_NS}/${D_IMAGE_NAME}

## version
BUILD_TAG=${BUILD_TAG:-localdev}
PACKAGE_VERSION=`cat package.json | python -c "import json,sys;obj=json.load(sys.stdin);print obj['version']"`
VERSION="${PACKAGE_VERSION}.${BUILD_TAG}"

R="\x1B[1;31m"
G="\x1B[1;32m"
W="\x1B[0m"

function dev_container_run {
  set -o pipefail
  ${DC} run ${DC_RUN_PARAMS} ${DEV_IMAGE} "$@" | sed "s#/usr/src/app/#./#g"
}

function info {
  echo -e "${G}${1}${W}"
}

function error {
  echo -e "${R}${1}${W}"
}

function helptext {
  info "Usage: ./go <command>"
  echo ""
  info "Available commands are:"
  echo "    init                    Setup the project on your development machine."
  echo "    start                   Start the server and it's dependencies."
  echo "    stop                    Shut down the server and it's dependencies."
  echo "    nuke                    Remove all local resources related to this project."
  echo "    lint                    Lint the javascript code."
  echo "    test                    Run laravel tests"
  echo "    create-migration <name> Create new db migration"
  echo "    create-model <name>     Create new db model"
  echo "    create-seed <name>      Create new db seed"
  echo "    migrate                 Run db migrations"
  echo "    seed                    Run db seeds"
}

function pre-commit {
  info "Pre commit"
  # ${DC} run client yarn run lint
}

function test {
  ${DC} run --rm dev yarn run test
}

function lint {
  ${DC} run client yarn run lint
}

function init {
  setup_hooks
  ${DC} build
}

function migrate {
  shift

  run_env=${1?Unknown migration environment! Please specify dev, test, staging or prod}

  info "Running migrations for ${run_env} environment..."

  case "${run_env}" in
      dev|development) SERVICE="development"
      ;;
      test) SERVICE="test"
      ;;
      staging) SERVICE="staging"
      ;;
      prod|production) SERVICE="production"
      ;;
      *) error $"Unknown migration environment! Please specify dev, test, staging or prod"
        helptext
        exit 1
  esac

  dev_container_run yarn run migrate up -- --env=${SERVICE}
}

function seed {
  info "DB seeding"
  ${DC} run ${DEV_IMAGE} npx sequelize db:seed
}

function create-migration {
  info "Creating $1 migration"
  ${DC} run ${DEV_IMAGE} npx migration:create --name $1
}

function create-model {
  info "Creating $1 model"
  ${DC} run ${DEV_IMAGE} npx sequelize model:create --name $1
}

function create-seed {
  info "Creating $1 seed"
  ${DC} run ${DEV_IMAGE} npx sequelize seed:create --name $1
}

function start {
  ${DC} up ${DEV_IMAGE}
}

function run_yarn {
  echo "Running $@"
  ${DC} run ${DEV_IMAGE} yarn $@
}

function install {
  run_yarn install
}

function stop {
  ${DC} stop
  ${DC} down
}

function nuke {
  read -p "🔥💣🔥 Are you sure you want to nuke all running containers and remove transpiled code and the node_modules?🔥💣🔥 (y/n) " -n 1 -r
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    info "\n🔥🔥🔥 Stopping all running containers 🔥🔥🔥"
    ${DC} down
    info "\n🔥🔥🔥 Removing all associated images 🔥🔥🔥"
    # TODO: Update to delete images/containers from Docker-compose
    [[ -n $(${D} images -q ${D_PROD_IMAGE}) ]] && ${D} rmi -f $(${D} images -q ${D_PROD_IMAGE})
    info "\n🔥🔥🔥 Nuking ALL YOUR build cache 🔥🔥🔥"
    rm -rf /node_modules .env
  fi
}


# If we have a pre-commit hook and the pre-commit hook does not equal what we
# want it to equal for this project then back it up with a timestamped file
# name and create a new pre-commit hook.
function setup_hooks {
  if [ -f .git/hooks/pre-commit ]; then
    current_pre_commit_hook=$(cat .git/hooks/pre-commit)
    expected_pre_commit_hook=$'#!/bin/sh\n\n./go pre-commit'

    if [ "$current_pre_commit_hook" != "$expected_pre_commit_hook" ]; then
      mv .git/hooks/pre-commit .git/hooks/$(date '+%Y%m%d%H%M%S').pre-commit.old
    fi
  fi

  cat > .git/hooks/pre-commit <<EOS
#!/bin/sh

./go pre-commit
EOS
  chmod +x .git/hooks/pre-commit
}

[[ $@ ]] || { helptext; exit 1; }

case "$1" in
    help) helptext
    ;;
    init) init
    ;;
    start) start
    ;;
    yarn) run_yarn $@
    ;;
    install) install
    ;;
    stop) stop
    ;;
    pre-commit) pre-commit
    ;;
    env) env
    ;;
    nuke) nuke
    ;;
    test) test
    ;;
    lint) lint
    ;;
    migrate) migrate $@
    ;;
    create-migration) create-migration $2
    ;;
    create-model) create-model $2
    ;;
    create-seed) create-seed $2
    ;;
    seed) seed
    ;;
    *)
    error "Unrecognized command! Please see usage below\n"
    helptext
    exit 1
esac
