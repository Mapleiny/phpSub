#!/bin/bash
WEB_PATH='~/phpApp/demo'
WEB_USER='root'
WEB_USERGROUP='root'
pwd
echo "pulling source code..."
git reset --hard origin/master
git clean -f
git pull
git checkout master

echo "Finished."
