#include "btree.h"
#include <stdint.h>
#include <stdio.h>
#define MAGIC 0x42545245u
#define MAX_KEYS 256
typedef struct{uint32_t magic,count;int keys[MAX_KEYS];int values[MAX_KEYS];}Node;
static Node*n(Pager*p,size_t root){return pager_get_page(p,root);}
int btree_init(Pager*p,size_t*root){if(!p->num_pages){*root=0;Node*x=n(p,0);x->magic=MAGIC;x->count=0;return 1;}*root=0;Node*x=n(p,0);if(x->magic!=MAGIC){x->magic=MAGIC;x->count=0;}return 1;}
int btree_insert(Pager*p,size_t root,int key,int value){Node*x=n(p,root);size_t i=0;while(i<x->count&&x->keys[i]<key)i++;if(i<x->count&&x->keys[i]==key){x->values[i]=value;return 1;}if(x->count>=MAX_KEYS)return 0;for(size_t j=x->count;j>i;j--){x->keys[j]=x->keys[j-1];x->values[j]=x->values[j-1];}x->keys[i]=key;x->values[i]=value;x->count++;return 1;}
int btree_find(Pager*p,size_t root,int key,int*value){Node*x=n(p,root);size_t lo=0,hi=x->count;while(lo<hi){size_t m=(lo+hi)/2;if(x->keys[m]<key)lo=m+1;else hi=m;}if(lo<x->count&&x->keys[lo]==key){*value=x->values[lo];return 1;}return 0;}
void btree_dump(Pager*p,size_t root){Node*x=n(p,root);for(size_t i=0;i<x->count;i++)printf("%d => %d\n",x->keys[i],x->values[i]);}