CC ?= cc
CFLAGS ?= -std=c11 -Wall -Wextra -Wpedantic -O2
chat-server: main.c
	$(CC) $(CFLAGS) -o $@ $<
clean:
	rm -f chat-server