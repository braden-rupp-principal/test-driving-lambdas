FROM python:3.7 as builder
WORKDIR /
RUN pip install --upgrade pip && \
    pip install awscli-local \
    pip install awscli --upgrade
FROM codercom/code-server:latest
USER root
COPY --from=builder /usr/local/ /usr/local
RUN apt-get update && apt-get install -y zip

ENV NVM_DIR /usr/local/nvm
RUN mkdir -p /usr/local/nvm/ && \
          curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash 
RUN /bin/bash -c "source $NVM_DIR/nvm.sh \
        && nvm install 6.17 .1 \
        && nvm install 10.1.0 \
        && nvm install node"
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH```

RUN ldconfig /usr/local/lib
RUN aws configure set aws_access_key_id temp && \
    aws configure set aws_secret_access_key temp && \
    aws configure set default.region us-east-2
