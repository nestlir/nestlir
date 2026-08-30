# Tiny Compiler Foundation (C)

A minimal lexer/parser/evaluator for arithmetic expressions. This is the first layer of a compiler project and intentionally keeps the language small so later commits can add an AST, variables, statements and code generation.

## Build
```bash
make
echo '2 + 3 * 4' | ./tiny-compiler
```