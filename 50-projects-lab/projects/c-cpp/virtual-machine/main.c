#include <stdio.h>
#include <stdint.h>

enum { HALT, PUSH, ADD, SUB, MUL, DIV, PRINT };
static int stack[256], sp=0;

static void push(int x){stack[sp++]=x;}
static int pop(void){return stack[--sp];}

int main(void){
    uint8_t code[]={PUSH,7,PUSH,5,MUL,PUSH,3,ADD,PRINT,HALT};
    size_t pc=0;
    for(;;){
        uint8_t op=code[pc++];
        switch(op){
            case HALT:return 0;
            case PUSH:push(code[pc++]);break;
            case ADD:{int b=pop(),a=pop();push(a+b);break;}
            case SUB:{int b=pop(),a=pop();push(a-b);break;}
            case MUL:{int b=pop(),a=pop();push(a*b);break;}
            case DIV:{int b=pop(),a=pop();push(a/b);break;}
            case PRINT:printf("%d\n",pop());break;
        }
    }
}