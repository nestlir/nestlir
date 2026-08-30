#!/usr/bin/env sh
set -eu
make
./tiny-http-server >/tmp/tiny-http.log 2>&1 &
pid=$!
trap 'kill $pid 2>/dev/null || true' EXIT
sleep 1
response=$(printf 'GET / HTTP/1.1\r\nHost: localhost\r\n\r\n' | nc 127.0.0.1 8080)
printf '%s' "$response" | grep -q '200 OK'
printf '%s' "$response" | grep -q 'Hello from Tiny HTTP Server'
