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