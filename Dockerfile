FROM node:alpine

RUN mkdir -p /home/app &&\
    touch /home/app/1.0.0

COPY ./app.js /home/app
COPY ./package.json /home/app

WORKDIR /home/app

RUN npm install --production

EXPOSE 3000

CMD ["node", "app.js"]
