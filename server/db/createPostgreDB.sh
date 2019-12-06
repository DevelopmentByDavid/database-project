#! /bin/bash
echo "creating db named ... project_DB"
createdb -h localhost -p 8192 "project_DB"
pg_ctl status
