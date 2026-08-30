# C/C++ Systems Engineering Lab

Independent build-from-scratch systems projects inspired by the C/C++ track of Project-Based Learning.

## Projects

- shell — POSIX process execution
- hash-table — chained hash map
- tiny-database — binary row store
- text-editor — raw terminal foundation
- tiny-compiler — recursive-descent parser
- memory-allocator — fixed-arena allocator
- virtual-machine — stack bytecode VM
- http-server — TCP HTTP server
- tcp-chat-server — multiplexed multi-client chat
- redis-clone — TCP in-memory key/value server
- chip8-emulator — CHIP-8 VM foundation
- tiny-raytracer — PPM ray tracer
- mini-kernel — freestanding x86 kernel foundation

## Build matrix

Host-native projects build with `make`. Networking projects run on localhost. The kernel intentionally requires a cross-toolchain and emulator workflow.