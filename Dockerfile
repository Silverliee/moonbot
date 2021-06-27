#Docker Image
FROM node:14
#App workspace
WORKDIR /moonbot
#Copy package json in the container
COPY package.json /moonbot
#Run npm install
RUN npm install

COPY ../moonbot /moonbot
CMD node index.js
EXPOSE 8080
#docker build . -t silverliee/moonbot
#docker run -p 8081:8081 silverliee/moonbot