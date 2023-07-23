FROM node:20-slim
WORKDIR /app

# プロジェクトフォルダのマウントでnode_modulesが消えるのを防ぐ
VOLUME /app/node_modules

COPY package.json package-lock.json /app/
RUN set -x \
    && apt-get update \
    && apt-get install -y \
    git \
    # deno のインストールに unzip, curl が必要
    unzip \
    curl \
    && curl -fsSL https://deno.land/install.sh | sh \
    && npm install 

ENV PATH=/root/.deno/bin:$PATH