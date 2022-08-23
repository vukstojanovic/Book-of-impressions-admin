FROM node:16.16-alpine3.16
ARG ENV_FILE

COPY . /opt/app
WORKDIR /opt/app

RUN npm install
RUN npm run build

COPY docker/entrypoint.sh /
RUN chmod +x /entrypoint.sh

CMD ["sh", "-c" , "/entrypoint.sh"]

EXPOSE 4173
