#include <stddef.h>
#include <stdint.h>
#include <stdio.h>

#define ARENA_SIZE 8192
#define ALIGN8(n) (((n)+7)&~7UL)

typedef struct Block {
    size_t size;
    int free;
    struct Block *next;
} Block;

static unsigned char arena[ARENA_SIZE];
static Block *head = (Block *)arena;

static void init(void) {
    head->size = ARENA_SIZE - sizeof(Block);
    head->free = 1;
    head->next = NULL;
}

static void *alloc(size_t n) {
    n = ALIGN8(n);
    for (Block *b=head; b; b=b->next) {
        if (b->free && b->size >= n) {
            if (b->size >= n + sizeof(Block) + 8) {
                Block *split=(Block *)((unsigned char *)(b+1)+n);
                split->size=b->size-n-sizeof(Block);
                split->free=1;
                split->next=b->next;
                b->size=n;
                b->next=split;
            }
            b->free=0;
            return b+1;
        }
    }
    return NULL;
}

static void merge(void) {
    for(Block *b=head;b && b->next;) {
        if(b->free && b->next->free) {
            b->size += sizeof(Block)+b->next->size;
            b->next=b->next->next;
        } else b=b->next;
    }
}

static void dealloc(void *p) {
    if(!p) return;
    Block *b=((Block *)p)-1;
    b->free=1;
    merge();
}

int main(void) {
    init();
    int *a=alloc(sizeof(int)*10);
    char *b=alloc(128);
    if(!a || !b) return 1;
    for(int i=0;i<10;i++) a[i]=i*i;
    printf("a[9]=%d, allocator working\n",a[9]);
    dealloc(a); dealloc(b);
    void *c=alloc(512);
    printf("reuse=%s\n",c ? "yes" : "no");
}