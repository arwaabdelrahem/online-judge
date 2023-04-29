#!/bin/sh

###########################
# Docker SETUP
###########################
apt-get update
apt-get install -y docker.io

echo "Docker Setup complete"

###########################
# NodeJS setup
###########################
apt-get update
apt-get install -y nodejs
apt-get install -y npm
echo "NodeJS setup Complete"

###########################
# Start Docker
###########################
chmod 777 ./src/problems/DockerTimeout.sh 
chmod 777 ./src/problems/Payload/script.sh
chmod 777 UpdateDocker.sh

systemctl restart docker
./UpdateDocker.sh
