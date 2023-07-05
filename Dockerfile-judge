############################################################
# Dockerfile to build sandbox for executing user code
# Based on Ubuntu
############################################################

FROM chug/ubuntu14.04x64 

# Update the repository sources list
RUN echo "deb http://archive.ubuntu.com/ubuntu trusty main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get upgrade
#Install all the languages/compilers we are supporting.
RUN apt-get install -y gcc

RUN apt-get install -y python
RUN apt-get install -y mono-xsp2 mono-xsp2-base

RUN apt-get install -y mono-vbnc
RUN apt-get install -y npm
RUN apt-get install -y nodejs

RUN apt-get install -y curl
RUN mkdir -p /opt/rust && \
    curl https://sh.rustup.rs -sSf | HOME=/opt/rust sh -s -- --no-modify-path -y && \
    chmod -R 777 /opt/rust

RUN apt-get install -y sudo
RUN apt-get install -y bc


