CC ?= cc
CFLAGS ?= -std=c11 -Wall -Wextra -Wpedantic -O2
tiny-db: main.c
	$(CC) $(CFLAGS) -o $@ $<
clean:
	rm -f tiny-db *.db