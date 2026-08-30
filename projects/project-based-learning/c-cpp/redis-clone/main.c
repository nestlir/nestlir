#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

typedef struct Entry { char key[64], value[256]; struct Entry *next; } Entry;
static Entry *db;
static Entry *find(const char *k){for(Entry *e=db;e;e=e->next)if(!strcmp(e->key,k))return e;return NULL;}
static void handle(FILE *io){
 char line[512];
 while(fgets(line,sizeof line,io)){
  char a[16],b[64],c[256]; int n=sscanf(line,"%15s %63s %255[^\n]",a,b,c);
  if(!strcmp(a,"QUIT")){fputs("BYE\n",io);fflush(io);break;}
  if(!strcmp(a,"SET")&&n==3){Entry *e=find(b);if(!e){e=calloc(1,sizeof *e);strcpy(e->key,b);e->next=db;db=e;}strcpy(e->value,c);fputs("OK\n",io);}
  else if(!strcmp(a,"GET")&&n>=2){Entry *e=find(b);fprintf(io,"%s\n",e?e->value:"(nil)");}
  else if(!strcmp(a,"DEL")&&n>=2){Entry **p=&db;while(*p&&strcmp((*p)->key,b))p=&(*p)->next;if(*p){Entry *x=*p;*p=x->next;free(x);fputs("1\n",io);}else fputs("0\n",io);}
  else if(!strcmp(a,"KEYS")){for(Entry *e=db;e;e=e->next)fprintf(io,"%s\n",e->key);fputs(".\n",io);}
  else fputs("ERR unknown command\n",io);
  fflush(io);
 }
}
int main(void){int s=socket(AF_INET,SOCK_STREAM,0),yes=1;setsockopt(s,SOL_SOCKET,SO_REUSEADDR,&yes,sizeof yes);struct sockaddr_in a={.sin_family=AF_INET,.sin_addr.s_addr=htonl(INADDR_ANY),.sin_port=htons(6380)};if(bind(s,(void*)&a,sizeof a)||listen(s,16)){perror("listen");return 1;}puts("tiny-redis on :6380");for(;;){int c=accept(s,0,0);if(c>=0){FILE *io=fdopen(c,"r+");handle(io);fclose(io);}}}