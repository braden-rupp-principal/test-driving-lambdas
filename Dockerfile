FROM python:3.7 as builder
WORKDIR /
RUN pip install --upgrade pip && \
    pip install awscli-local \
    pip install awscli --upgrade

FROM codercom/code-server:latest
USER root
COPY --from=builder /usr/local/ /usr/local
RUN apt-get update && apt-get install -y zip
RUN ldconfig /usr/local/lib 
RUN aws configure set aws_access_key_id temp && \
    aws configure set aws_secret_access_key temp && \
    aws configure set default.region us-east-2