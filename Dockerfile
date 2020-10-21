FROM node:12.18.3-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache chromium-chromedriver chromium bash && \
    npm install -g @angular/cli

ENV CHROME_BIN /usr/bin/chromium-browser

WORKDIR /usr/src/labs

EXPOSE 4200

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["ng", "serve", "--host=0.0.0.0"]