#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int main(void){
    int s=socket(AF_INET,SOCK_STREAM,0), yes=1;
    setsockopt(s,SOL_SOCKET,SO_REUSEADDR,&yes,sizeof(yes));
    struct sockaddr_in addr={0};
    addr.sin_family=AF_INET; addr.sin_addr.s_addr=htonl(INADDR_ANY); addr.sin_port=htons(8080);
    if(bind(s,(struct sockaddr*)&addr,sizeof(addr))<0){perror("bind");return 1;}
    if(listen(s,16)<0){perror("listen");return 1;}
    puts("listening on http://127.0.0.1:8080");
    for(;;){
        int c=accept(s,NULL,NULL);
        if(c<0) continue;
        char req[2048]; read(c,req,sizeof(req)-1);
        const char *body="Hello from Tiny HTTP Server\n";
        char res[512];
        int n=snprintf(res,sizeof(res),"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: %zu\r\nConnection: close\r\n\r\n%s",strlen(body),body);
        write(c,res,n); close(c);
    }
}