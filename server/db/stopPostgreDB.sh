#! /bin/bash
pg_ctl -o "-c unix_socket_directories=/tmp/project/myDB/sockets -p 8192" -D /tmp/project/myDB/data -l /tmp/project/logfile stop
