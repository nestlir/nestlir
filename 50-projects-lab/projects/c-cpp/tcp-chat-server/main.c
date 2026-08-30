#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <string.h>
#include <sys/select.h>
#include <unistd.h>

int main(void){int s=socket(AF_INET,SOCK_STREAM,0),yes=1;setsockopt(s,SOL_SOCKET,SO_REUSEADDR,&yes,sizeof yes);struct sockaddr_in a={.sin_family=AF_INET,.sin_addr.s_addr=htonl(INADDR_ANY),.sin_port=htons(9000)};if(bind(s,(void*)&a,sizeof a)||listen(s,16)){perror("listen");return 1;}fd_set master,readfds;FD_ZERO(&master);FD_SET(s,&master);int max=s;puts("chat server :9000");for(;;){readfds=master;if(select(max+1,&readfds,0,0,0)<0)break;for(int i=0;i<=max;i++)if(FD_ISSET(i,&readfds)){if(i==s){int c=accept(s,0,0);if(c>=0){FD_SET(c,&master);if(c>max)max=c;write(c,"Welcome\n",8);}}else{char b[512];int n=read(i,b,sizeof b);if(n<=0){close(i);FD_CLR(i,&master);}else for(int j=0;j<=max;j++)if(j!=s&&j!=i&&FD_ISSET(j,&master))write(j,b,n);}}}}