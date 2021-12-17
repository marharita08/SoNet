FROM node
WORKDIR /api
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["npm", "start"]
