typedef unsigned short u16;
static volatile u16 *const VGA=(u16*)0xB8000;
void kernel_main(void){const char *s="Mini Kernel booted";for(int i=0;s[i];++i)VGA[i]=(u16)s[i]|0x0F00;for(;;)__asm__ volatile("hlt");}