FROM node:alpine AS builder

WORKDIR "/app"

COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
