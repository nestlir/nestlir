CC ?= cc
CFLAGS ?= -std=c11 -Wall -Wextra -Wpedantic -O2
tiny-compiler: main.c
	$(CC) $(CFLAGS) -o $@ $<
clean:
	rm -f tiny-compiler