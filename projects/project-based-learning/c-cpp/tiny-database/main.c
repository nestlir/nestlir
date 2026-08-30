#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define NAME_SIZE 32
typedef struct { int id; char name[NAME_SIZE]; } Row;

static void insert(FILE *f, int id, const char *name) {
    Row row={.id=id}; snprintf(row.name,sizeof(row.name),"%s",name);
    fseek(f,0,SEEK_END); fwrite(&row,sizeof(row),1,f); fflush(f);
}
static void select_all(FILE *f) {
    Row row; rewind(f);
    while (fread(&row,sizeof(row),1,f)==1) printf("(%d, %s)\n",row.id,row.name);
}
int main(int argc,char **argv) {
    if(argc!=2){fprintf(stderr,"usage: %s <file>\n",argv[0]);return 1;}
    FILE *f=fopen(argv[1],"a+b"); if(!f){perror("open");return 1;}
    char line[256];
    while(1){
        printf("db > "); fflush(stdout);
        if(!fgets(line,sizeof(line),stdin)) break;
        int id; char name[NAME_SIZE];
        if(!strncmp(line,"exit",4)) break;
        if(!strncmp(line,"select",6)){select_all(f);continue;}
        if(sscanf(line,"insert %d %31s",&id,name)==2){insert(f,id,name);continue;}
        puts("unrecognized command");
    }
    fclose(f);
}