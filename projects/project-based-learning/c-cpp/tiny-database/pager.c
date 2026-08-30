#include "pager.h"
#include <stdlib.h>
#include <string.h>
int pager_open(Pager *p,const char *name){memset(p,0,sizeof *p);p->file=fopen(name,"r+b");if(!p->file)p->file=fopen(name,"w+b");if(!p->file)return 0;fseek(p->file,0,SEEK_END);long n=ftell(p->file);p->num_pages=(size_t)((n+PAGE_SIZE-1)/PAGE_SIZE);return 1;}
void *pager_get_page(Pager *p,size_t n){if(n>=MAX_PAGES)return NULL;if(!p->pages[n]){p->pages[n]=calloc(1,PAGE_SIZE);if(n<p->num_pages){fseek(p->file,(long)(n*PAGE_SIZE),SEEK_SET);fread(p->pages[n],1,PAGE_SIZE,p->file);}}if(n>=p->num_pages)p->num_pages=n+1;return p->pages[n];}
int pager_flush(Pager *p,size_t n,size_t size){if(!p->pages[n])return 1;fseek(p->file,(long)(n*PAGE_SIZE),SEEK_SET);return fwrite(p->pages[n],1,size,p->file)==size;}
void pager_close(Pager *p){for(size_t i=0;i<p->num_pages;i++){if(p->pages[i]){pager_flush(p,i,PAGE_SIZE);free(p->pages[i]);}}fclose(p->file);}