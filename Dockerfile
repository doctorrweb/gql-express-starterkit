FROM node:carbon

WORKDIR /usr/src/app

COPY . .

RUN npm install && \
    npm rebuild bcrypt --build-from-source

EXPOSE 3000 4000 9204
CMD [ "npm", "run", "start" ]