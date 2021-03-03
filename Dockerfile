FROM node:12.18.4

WORKDIR /usr/src/starter

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]

