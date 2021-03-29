FROM python:3.7 as builder
WORKDIR /
RUN pip install --upgrade pip && \
    pip install awscli-local \
    pip install awscli --upgrade

FROM codercom/code-server:latest
COPY --from=builder /usr/local/ /usr/local

ENV NODE_VERSION=15.11.0
RUN sudo apt-get update && sudo apt-get install -y curl zip
RUN mkdir -p $HOME/.nvm 
RUN sudo curl -sL https://deb.nodesource.com/setup_15.x | sudo bash -
RUN sudo apt-get install nodejs -y
ENV SHELL /bin/bash
RUN sudo ldconfig /usr/local/   
RUN aws configure set aws_access_key_id temp && \
    aws configure set aws_secret_access_key temp && \
    aws configure set default.region us-east-2
