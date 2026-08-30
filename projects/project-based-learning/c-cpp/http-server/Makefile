CC ?= cc
CFLAGS ?= -std=c11 -Wall -Wextra -Wpedantic -O2
tiny-http-server: main.c
	$(CC) $(CFLAGS) -o $@ $<
clean:
	rm -f tiny-http-server