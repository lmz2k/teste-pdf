FROM node:14

# Create app directory
WORKDIR /usr/src/app

RUN apk add --no-cache \
    msttcorefonts-installer font-noto fontconfig \
    freetype ttf-dejavu ttf-droid ttf-freefont ttf-liberation \
    chromium \
  && rm -rf /var/cache/apk/* /tmp/*

RUN update-ms-fonts \
    && fc-cache -f \

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
EXPOSE 8080

CMD [ "node", "index.js" ]
