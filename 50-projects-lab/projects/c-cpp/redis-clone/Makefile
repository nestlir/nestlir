CC ?= cc
CFLAGS ?= -std=c11 -D_POSIX_C_SOURCE=200809L -Wall -Wextra -O2
tiny-redis: main.c
	$(CC) $(CFLAGS) -o $@ $<
clean:
	rm -f tiny-redis