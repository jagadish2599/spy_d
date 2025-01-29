# Use Node.js image to build the React app
FROM node:18 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Use Nginx to serve the React build
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
