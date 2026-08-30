#ifndef BTREE_H
#define BTREE_H
#include <stddef.h>
#include "pager.h"
int btree_init(Pager *p,size_t *root);
int btree_insert(Pager *p,size_t root,int key,int value);
int btree_find(Pager *p,size_t root,int key,int *value);
void btree_dump(Pager *p,size_t root);
#endif