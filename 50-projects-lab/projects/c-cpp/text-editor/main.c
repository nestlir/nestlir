#define _DEFAULT_SOURCE
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <termios.h>
#include <unistd.h>
typedef struct{char **r;int n,cx,cy,dirty;char file[256];}Ed;static Ed E;static struct termios orig;
static void off(void){tcsetattr(0,TCSAFLUSH,&orig);}static void on(void){tcgetattr(0,&orig);atexit(off);struct termios x=orig;x.c_lflag&=~(ECHO|ICANON|IEXTEN|ISIG);x.c_iflag&=~(IXON|ICRNL|BRKINT|INPCK|ISTRIP);x.c_oflag&=~OPOST;x.c_cflag|=CS8;x.c_cc[VMIN]=0;x.c_cc[VTIME]=1;tcsetattr(0,TCSAFLUSH,&x);}
static int key(void){char c;while(read(0,&c,1)!=1);if(c==27){char a,b;if(read(0,&a,1)!=1||read(0,&b,1)!=1)return 27;if(a=='['&&b>='A'&&b<='D')return 1000+b;}return c;}
static void addrow(int at,const char*s,int len){E.r=realloc(E.r,sizeof(char*)*(E.n+1));memmove(E.r+at+1,E.r+at,sizeof(char*)*(E.n-at));E.r[at]=malloc(len+1);memcpy(E.r[at],s,len);E.r[at][len]=0;E.n++;}
static void load(const char*f){snprintf(E.file,sizeof E.file,"%s",f);FILE*fp=fopen(f,"r");if(!fp)return;char b[1024];while(fgets(b,sizeof b,fp)){int n=strcspn(b,"\r\n");addrow(E.n,b,n);}fclose(fp);}
static void save(void){if(!E.file[0])return;FILE*f=fopen(E.file,"w");if(!f)return;for(int i=0;i<E.n;i++)fprintf(f,"%s\n",E.r[i]);fclose(f);E.dirty=0;}
static void draw(void){write(1,"\x1b[H",3);for(int y=0;y<22;y++){if(y<E.n)write(1,E.r[y],strlen(E.r[y]));write(1,"\x1b[K\r\n",5);}char s[320];snprintf(s,sizeof s,"\x1b[7m %s | %d lines | %s | Ctrl-S save Ctrl-Q quit \x1b[m",E.file[0]?E.file:"[new]",E.n,E.dirty?"modified":"saved");write(1,s,strlen(s));char p[32];snprintf(p,sizeof p,"\x1b[%d;%dH",E.cy+1,E.cx+1);write(1,p,strlen(p));}
static void edit(int k){if(k==17)exit(0);if(k==19){save();return;}if(k==1000+'A'&&E.cy>0)E.cy--;else if(k==1000+'B'&&E.cy<E.n-1)E.cy++;else if(k==1000+'C'&&E.cy<E.n&&E.cx<(int)strlen(E.r[E.cy]))E.cx++;else if(k==1000+'D'&&E.cx>0)E.cx--;else if(k==127&&E.cy<E.n&&E.cx>0){char*s=E.r[E.cy];memmove(s+E.cx-1,s+E.cx,strlen(s)-E.cx+1);E.cx--;E.dirty=1;}else if(k=='\r'){if(!E.n)addrow(0,"",0);else addrow(E.cy+1,E.r[E.cy]+E.cx,strlen(E.r[E.cy])-E.cx);E.r[E.cy][E.cx]=0;E.cy++;E.cx=0;E.dirty=1;}else if(isprint(k)){if(!E.n)addrow(0,"",0);char*s=E.r[E.cy];int n=strlen(s);s=realloc(s,n+2);memmove(s+E.cx+1,s+E.cx,n-E.cx+1);s[E.cx]=k;E.r[E.cy]=s;E.cx++;E.dirty=1;}}
int main(int c,char**v){on();if(c>1)load(v[1]);write(1,"\x1b[2J",4);for(;;){draw();edit(key());}}