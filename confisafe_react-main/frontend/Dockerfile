# ==========================================
# DOCKERFILE - FRONTEND REACT (ConfiSafe)
# ==========================================

# STAGE 1: BUILD
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENV REACT_APP_API_URL=http://localhost:8080/api
RUN npm run build

# STAGE 2: NGINX
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
