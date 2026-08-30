# Tiny Redis Clone (C)

A small TCP key-value server using a compact line protocol.

## Commands
- SET key value
- GET key
- DEL key
- KEYS
- QUIT

## Run
```bash
make
./tiny-redis
```
Then connect with `nc 127.0.0.1 6380`.