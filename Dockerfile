# Étape 1 : Build de l'application React/Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
COPY yarn.lock ./

# Installation des dépendances
RUN yarn install

# Copie du code source
COPY . .

# Build de l'application
RUN yarn build

# Étape 2 : Serveur web Nginx pour la production
FROM nginx:alpine

# Copie de la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers compilés depuis l'étape 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
