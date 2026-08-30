CC ?= cc
CFLAGS ?= -std=c11 -Wall -Wextra -Wpedantic -O2
tiny-db: main.c pager.c
	$(CC) $(CFLAGS) -o $@ main.c pager.c
clean:
	rm -f tiny-db *.db