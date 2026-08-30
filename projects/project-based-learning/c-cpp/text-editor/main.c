#include <termios.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>

static struct termios original;

static void disable_raw(void) { tcsetattr(STDIN_FILENO,TCSAFLUSH,&original); }
static void enable_raw(void) {
    tcgetattr(STDIN_FILENO,&original);
    atexit(disable_raw);
    struct termios raw=original;
    raw.c_lflag &= ~(ECHO|ICANON|IEXTEN|ISIG);
    raw.c_iflag &= ~(IXON|ICRNL|BRKINT|INPCK|ISTRIP);
    raw.c_oflag &= ~(OPOST);
    raw.c_cflag |= CS8;
    raw.c_cc[VMIN]=0; raw.c_cc[VTIME]=1;
    tcsetattr(STDIN_FILENO,TCSAFLUSH,&raw);
}
static void refresh(void) {
    write(STDOUT_FILENO,"\x1b[2J\x1b[H",7);
    write(STDOUT_FILENO,"Tiny Editor — Ctrl-Q quits\r\n",31);
}
int main(void) {
    enable_raw();
    while(1) {
        refresh();
        char c;
        if(read(STDIN_FILENO,&c,1)==1 && c==17) break;
    }
}