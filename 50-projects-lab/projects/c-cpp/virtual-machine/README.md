# Stack Virtual Machine (C)

A small bytecode VM with a stack, arithmetic instructions and a print opcode.

## Build

```bash
make
./tiny-vm
```

## Architecture

`bytecode → fetch → decode → execute → stack state`