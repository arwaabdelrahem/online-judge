echo "Creating Docker Image"
docker build -t 'virtual_machine' - < Dockerfile-judge
echo "Retrieving Installed Docker Images"
docker images
