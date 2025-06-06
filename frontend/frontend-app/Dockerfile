# build stage
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# production stage
FROM nginx:alpine
COPY --from=builder /app/dist/frontend-app/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
