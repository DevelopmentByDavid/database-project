#! /bin/bash
export folder=/tmp/project
export PGDATA=$folder/myDB/data
export PGSOCKETS=$folder/myDB/sockets

echo $folder

#Clear folder
rm -rf $folder

#Initialize folders
mkdir $folder
mkdir $folder/myDB
mkdir $folder/myDB/data
mkdir $folder/myDB/sockets
sleep 1

#Initialize DB
initdb

sleep 1
#Start folder
export PGPORT=8192
pg_ctl -o "-c unix_socket_directories=/tmp/project/myDB/sockets -p 8192" -D /tmp/project/myDB/data -l /tmp/project/logfile start

echo "creating db named ... project_DB"
createdb -h localhost -p 8192 "project_DB"
pg_ctl status


