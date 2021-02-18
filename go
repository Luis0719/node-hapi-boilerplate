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
  echo "    test                    Run tests"
  echo "    create-model <name>     Create new db model"
  echo "    seed                    Run db seeds"
}

function pre-commit {
  info "Pre commit"
  # ${DC} run client yarn run lint
}

function test {
  run_yarn test
}

function lint {
  run_yarn lint
}

function init {
  setup_hooks
  ${DC} build
}

function seed {
  run_yarn seed
}

function create-model {
  info "Creating $1 model"
  ${DC} run ${DEV_IMAGE} npx sequelize model:create --name $1
}

function start {
  ${DC} up ${DEV_IMAGE}
}

function exec {
  echo "Running $@"
  ${DC} run ${DEV_IMAGE} $@
}

function run_yarn {
  exec yarn $@
}

function install {
  run_yarn install
}

function prettier {
  run_yarn make-pretty
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

function shell {
  exec bash
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
    exec) exec ${@:2} # Send all but first arg
    ;;
    yarn) run_yarn ${@:2}
    ;;
    install) install
    ;;
    prettier) prettier
    ;;
    stop) stop
    ;;
    pre-commit) pre-commit
    ;;
    shell) shell
    ;;
    env) env
    ;;
    nuke) nuke
    ;;
    test) test
    ;;
    lint) lint
    ;;
    create-model) create-model $2
    ;;
    seed) seed
    ;;
    *)
    error "Unrecognized command! Please see usage below\n"
    helptext
    exit 1
esac
