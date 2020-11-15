FROM node:12.18.4

WORKDIR /usr/src/super-app

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]

