#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUCKETS 32

typedef struct Node { char *key; int value; struct Node *next; } Node;
typedef struct { Node *b[BUCKETS]; } Table;

static unsigned hash(const char *s) {
    unsigned h = 5381;
    for (; *s; ++s) h = ((h << 5) + h) ^ (unsigned char)*s;
    return h % BUCKETS;
}
static void put(Table *t, const char *key, int value) {
    unsigned i = hash(key);
    for (Node *n=t->b[i]; n; n=n->next)
        if (!strcmp(n->key,key)) { n->value=value; return; }
    Node *n=malloc(sizeof(*n));
    n->key=strdup(key); n->value=value; n->next=t->b[i]; t->b[i]=n;
}
static Node *get(Table *t,const char *key) {
    for(Node *n=t->b[hash(key)]; n; n=n->next) if(!strcmp(n->key,key)) return n;
    return NULL;
}
static void destroy(Table *t) {
    for(int i=0;i<BUCKETS;i++) { Node *n=t->b[i]; while(n){Node *next=n->next; free(n->key); free(n); n=next;} }
}
int main(void) {
    Table t={0};
    put(&t,"language",1); put(&t,"systems",2); put(&t,"language",3);
    Node *n=get(&t,"language");
    printf("language=%d\n", n ? n->value : -1);
    destroy(&t);
}