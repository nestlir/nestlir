#!/usr/bin/env sh
set -eu
make
test "$(./tiny-vm)" = "38"
