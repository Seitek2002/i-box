# # Dockerfile
# # Используем официальный образ Node.js для сборки
# FROM node:18 as build

# # Устанавливаем рабочую директорию
# WORKDIR /app

# # Копируем package.json и package-lock.json
# COPY package*.json ./

# # Устанавливаем зависимости
# RUN npm install

# # Копируем остальные файлы приложения
# COPY . .

# # Собираем React-приложение
# RUN npm run build

# # Используем минимальный nginx-образ для раздачи файлов
# FROM nginx:alpine

# # Копируем сгенерированные файлы в nginx
# COPY --from=build /app/dist /usr/share/nginx/html

# # Копируем файл конфигурации nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Указываем порт
# EXPOSE 80

# # Запускаем nginx
# CMD ["nginx", "-g", "daemon off;"]


#===============================================================

FROM node:20.11.1-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install serve -g
COPY . .
RUN npm run build
EXPOSE 3000

CMD ["cp", "-r", "/app/dist/.", "/frontend_static/"]
CMD ["npm", "run", "serve"]
