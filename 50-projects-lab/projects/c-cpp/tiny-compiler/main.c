#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
typedef enum{NUM,ADD,SUB,MUL,DIV,LP,RP,END}Token;
static const char *p; static Token tok; static long val;
static void next(void){while(isspace((unsigned char)*p))p++;char c=*p++;if(isdigit((unsigned char)c)){val=c-'0';while(isdigit((unsigned char)*p))val=val*10+(*p++-'0');tok=NUM;return;}tok=c=='+'?ADD:c=='-'?SUB:c=='*'?MUL:c=='/'?DIV:c=='('?LP:c==')'?RP:END;}
static long expr(void);static long factor(void){if(tok==NUM){long v=val;next();return v;}if(tok==LP){next();long v=expr();if(tok==RP)next();return v;}fprintf(stderr,"parse error\n");exit(1);}
static long term(void){long v=factor();while(tok==MUL||tok==DIV){Token o=tok;next();long r=factor();v=o==MUL?v*r:v/r;}return v;}
static long expr(void){long v=term();while(tok==ADD||tok==SUB){Token o=tok;next();long r=term();v=o==ADD?v+r:v-r;}return v;}
int main(void){char b[1024];if(!fgets(b,sizeof b,stdin))return 1;p=b;next();printf("%ld\n",expr());}