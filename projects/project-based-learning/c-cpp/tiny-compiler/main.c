#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>

static const char *p;
static long expr(void);
static void ws(void){while(isspace((unsigned char)*p))p++;}
static long factor(void){
    ws();
    if(*p=='('){p++;long v=expr();ws();if(*p==')')p++;return v;}
    char *end; long v=strtol(p,&end,10); p=end; return v;
}
static long term(void){
    long v=factor(); ws();
    while(*p=='*'||*p=='/'){char op=*p++;long r=factor();v=op=='*'?v*r:v/r;ws();}
    return v;
}
static long expr(void){
    long v=term(); ws();
    while(*p=='+'||*p=='-'){char op=*p++;long r=term();v=op=='+'?v+r:v-r;ws();}
    return v;
}
int main(void){
    char buf[1024];
    if(!fgets(buf,sizeof(buf),stdin))return 1;
    p=buf; printf("%ld\n",expr());
}