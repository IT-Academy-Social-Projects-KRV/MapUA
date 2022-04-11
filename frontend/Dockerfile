FROM node:14-alpine as build
WORKDIR /app
# adds node_modules in the PATH
ENV PATH /app/node_modules/.bin:$PATH 
COPY ./frontend/package.json /app/
COPY ./frontend/yarn.lock /app/
RUN yarn
COPY ./frontend /app
RUN yarn build

FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY frontend/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]