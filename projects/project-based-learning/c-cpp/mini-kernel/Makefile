CC ?= i686-elf-gcc
AS ?= i686-elf-as
CFLAGS=-ffreestanding -m32 -Wall -Wextra -O2
all: kernel.elf
boot.o: boot.s
	$(AS) --32 $< -o $@
kernel.o: kernel.c
	$(CC) $(CFLAGS) -c $< -o $@
kernel.elf: boot.o kernel.o linker.ld
	$(CC) -T linker.ld -ffreestanding -nostdlib -o $@ boot.o kernel.o -lgcc
clean:
	rm -f *.o *.elf