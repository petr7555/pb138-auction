FROM node:alpine as build

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build ./build /var/www/diary
COPY --from=build *.conf /etc/nginx/conf.d