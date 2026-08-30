# Mini Kernel

Freestanding x86 kernel foundation designed for booting in QEMU through a Multiboot-compatible loader.

## Current milestone
- Multiboot header
- kernel entry
- VGA text output
- freestanding build layout

The project requires a cross-compiler/Multiboot-capable GRUB toolchain to produce a bootable ISO; host-native compilation alone is intentionally not presented as equivalent verification.