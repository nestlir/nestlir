#!/usr/bin/env sh
set -eu
make
rm -f test.db
printf 'insert 1 Anastasia\ninsert 2 Systems\nexit\n' | ./tiny-db test.db
out=$(printf 'select\nexit\n' | ./tiny-db test.db)
printf '%s' "$out" | grep -q '(1, Anastasia)'
printf '%s' "$out" | grep -q '(2, Systems)'
rm -f test.db