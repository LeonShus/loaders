# pull official base image
FROM node:18.12.0-alpine as build

# set working directory
WORKDIR /usr/src/app

COPY package*.json yarn.lock ./ 

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]


FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]