#ifndef PAGER_H
#define PAGER_H
#include <stddef.h>
#include <stdio.h>
#define PAGE_SIZE 4096
#define MAX_PAGES 128
typedef struct { FILE *file; void *pages[MAX_PAGES]; size_t num_pages; } Pager;
int pager_open(Pager *p,const char *filename);
void *pager_get_page(Pager *p,size_t page_num);
int pager_flush(Pager *p,size_t page_num,size_t size);
void pager_close(Pager *p);
#endif