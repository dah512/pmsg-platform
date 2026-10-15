# Built from the repo root so the curriculum folders can be copied in.
FROM node:20-alpine AS build
WORKDIR /src
COPY web/package*.json ./
RUN npm ci --no-audit --no-fund
COPY web/ ./
RUN npm run build

FROM nginx:1.27-alpine
COPY web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/build /usr/share/nginx/html/web
COPY curriculum/hub /usr/share/nginx/html/curriculum-hub
COPY curriculum/site /usr/share/nginx/html/curriculum-site
# Source files may carry owner-only modes (e.g. synced from iCloud); nginx must read them.
RUN chmod -R a+rX /usr/share/nginx/html
EXPOSE 80 8081 8082
