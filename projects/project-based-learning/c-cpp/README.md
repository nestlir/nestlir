# C/C++ Systems Engineering Lab

Runnable systems projects built from scratch. Each project is isolated and has its own README and Makefile.

## Prerequisites

Linux, macOS, or WSL are recommended.

Install a C/C++ toolchain:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install build-essential make

# Optional networking smoke-test client
sudo apt install netcat-openbsd
```

## Quick start

Clone the repository and enter the lab:

```bash
git clone https://github.com/nestlir/nestlir.git
cd nestlir/projects/project-based-learning/c-cpp
```

## Runnable projects

| Project | Build | Run | What it demonstrates |
|---|---|---|---|
| shell | `make -C shell` | `./shell/shell` | fork/exec/wait |
| hash-table | `make -C hash-table` | project binary | chained hash map |
| tiny-database | `make -C tiny-database` | `./tiny-database/tiny-db data.db` | pager-backed storage |
| text-editor | `make -C text-editor` | `./text-editor/tiny-editor notes.txt` | raw terminal editing |
| tiny-compiler | `make -C tiny-compiler` | `printf '2+3*4\n' \| ./tiny-compiler/tiny-compiler` | lexer/parser |
| memory-allocator | `make -C memory-allocator` | `./memory-allocator/allocator-demo` | allocation/free |
| virtual-machine | `make -C virtual-machine` | `./virtual-machine/tiny-vm` | bytecode VM |
| http-server | `make -C http-server` | `./http-server/tiny-http-server` | HTTP over TCP |
| tcp-chat-server | `make -C tcp-chat-server` | `./tcp-chat-server/chat-server` | select/multiple clients |
| redis-clone | `make -C redis-clone` | `./redis-clone/tiny-redis` | TCP key/value store |
| chip8-emulator | `make -C chip8-emulator` | `./chip8-emulator/chip8 [rom]` | emulator core |
| tiny-raytracer | `make -C tiny-raytracer` | `./tiny-raytracer/raytracer` | ray/sphere rendering |

## Project walkthroughs

### Shell

```bash
make -C shell
./shell/shell
```

Inside the shell try:

```text
pwd
ls
cd ..
exit
```

### Tiny Database

```bash
make -C tiny-database
./tiny-database/tiny-db demo.db
```

Then:

```text
insert 1 Anastasia
insert 2 Systems
select
exit
```

Reopen the same file to verify persistence:

```bash
./tiny-database/tiny-db demo.db
```

### Text Editor

```bash
printf 'hello\nworld\n' > notes.txt
make -C text-editor
./text-editor/tiny-editor notes.txt
```

Controls: arrows, Enter, Backspace, Ctrl-S, Ctrl-Q.

### Compiler

```bash
make -C tiny-compiler
printf '2 + 3 * (4 + 1)\n' | ./tiny-compiler/tiny-compiler
```

Expected output: `17`.

### HTTP Server

Terminal 1:

```bash
make -C http-server
./http-server/tiny-http-server
```

Terminal 2:

```bash
curl http://127.0.0.1:8080/
```

### TCP Chat

Terminal 1:

```bash
make -C tcp-chat-server
./tcp-chat-server/chat-server
```

Terminal 2 and 3:

```bash
nc 127.0.0.1 9000
```

Messages are broadcast to the other clients.

### Redis Clone

```bash
make -C redis-clone
./redis-clone/tiny-redis
```

In another terminal:

```bash
nc 127.0.0.1 6380
```

Then:

```text
SET name Anastasia
GET name
KEYS
DEL name
QUIT
```

### CHIP-8

Demo mode:

```bash
make -C chip8-emulator
./chip8-emulator/chip8
```

ROM mode:

```bash
./chip8-emulator/chip8 path/to/program.ch8
```

The current project is a functional emulator core; a graphical frontend and complete opcode coverage are documented as future milestones.

### Tiny Ray Tracer

```bash
make -C tiny-raytracer
./tiny-raytracer/raytracer
```

It writes `image.ppm`.

### Mini Kernel

The kernel is intentionally separate because it needs a freestanding cross-toolchain.

Required tools include:

- `i686-elf-gcc`
- `i686-elf-as`
- GRUB/Multiboot tooling
- QEMU

Build:

```bash
cd mini-kernel
make
```

This is not treated as a host-native executable.

## CI

GitHub Actions builds the host-native projects automatically on pushes and pull requests.

## Roadmap

1. Database: B-tree and SQL parser
2. Compiler: AST and bytecode backend
3. CHIP-8: remaining opcodes and frontend
4. Redis clone: RESP and persistence
5. Kernel: interrupts, memory, keyboard and filesystem
