#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

#define MAX_LINE 1024
#define MAX_ARGS 64

static int split(char *line, char **argv) {
    int n = 0;
    char *token = strtok(line, " \t\r\n");
    while (token && n < MAX_ARGS - 1) {
        argv[n++] = token;
        token = strtok(NULL, " \t\r\n");
    }
    argv[n] = NULL;
    return n;
}

int main(void) {
    char line[MAX_LINE];
    char *argv[MAX_ARGS];

    while (1) {
        printf("mini-shell$ ");
        fflush(stdout);
        if (!fgets(line, sizeof(line), stdin)) break;

        int argc = split(line, argv);
        if (!argc) continue;
        if (!strcmp(argv[0], "exit")) break;
        if (!strcmp(argv[0], "pwd")) { char cwd[MAX_LINE]; if (getcwd(cwd, sizeof(cwd))) puts(cwd); continue; }
        if (!strcmp(argv[0], "cd")) { if (chdir(argv[1] ? argv[1] : getenv("HOME"))) perror("cd"); continue; }

        pid_t pid = fork();
        if (pid < 0) { perror("fork"); continue; }
        if (pid == 0) { execvp(argv[0], argv); perror("exec"); _exit(127); }

        int status;
        waitpid(pid, &status, 0);
    }
    return 0;
}