# Stage 1: Build the React frontend
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
# Use npm ci for reproducible builds
RUN npm ci
COPY . .
# Define o argumento que será passado durante o build
ARG VERSION
# Define a variável de ambiente para o build do React, usando o argumento
ENV REACT_APP_VERSION=$VERSION
RUN npm run build

# Stage 2: Create the final image with the Node.js backend
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
# Install production dependencies only
RUN npm ci --production
COPY --from=build /app/build ./build
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]
