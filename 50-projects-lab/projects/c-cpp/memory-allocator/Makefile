CC ?= cc
CFLAGS ?= -std=c11 -Wall -Wextra -Wpedantic -O2
allocator-demo: main.c
	$(CC) $(CFLAGS) -o $@ $<
clean:
	rm -f allocator-demo