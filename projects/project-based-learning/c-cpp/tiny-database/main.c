#include "pager.h"
#include <stdio.h>
#include <string.h>
#define NAME_SIZE 32
typedef struct { int id; char name[NAME_SIZE]; } Row;
#define ROWS_PER_PAGE (PAGE_SIZE/sizeof(Row))
static Row *row_at(Pager *p,size_t n){return &((Row*)pager_get_page(p,n/ROWS_PER_PAGE))[n%ROWS_PER_PAGE];}
int main(int argc,char **argv){if(argc!=2){fprintf(stderr,"usage: %s <file>\n",argv[0]);return 1;}Pager p;if(!pager_open(&p,argv[1])){perror("open");return 1;}size_t rows=0;for(size_t pg=0;pg<p.num_pages;pg++)for(size_t i=0;i<ROWS_PER_PAGE;i++){Row *r=row_at(&p,pg*ROWS_PER_PAGE+i);if(r->id)rows=pg*ROWS_PER_PAGE+i+1;}char line[128];while(printf("db > "),fflush(stdout),fgets(line,sizeof line,stdin)){if(!strncmp(line,"exit",4))break;if(!strncmp(line,"select",6)){for(size_t i=0;i<rows;i++){Row *r=row_at(&p,i);if(r->id)printf("(%d, %s)\n",r->id,r->name);}continue;}int id;char name[NAME_SIZE];if(sscanf(line,"insert %d %31s",&id,name)==2){Row *r=row_at(&p,rows++);r->id=id;snprintf(r->name,sizeof r->name,"%s",name);}else puts("syntax: insert <id> <name> | select | exit");}pager_close(&p);}