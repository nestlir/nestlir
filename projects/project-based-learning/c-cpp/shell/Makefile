CC ?= cc
CFLAGS ?= -std=c11 -Wall -Wextra -Wpedantic -O2

mini-shell: main.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f mini-shell