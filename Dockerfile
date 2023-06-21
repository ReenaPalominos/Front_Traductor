# Base image
FROM nginx:latest

# Directorio de trabajo en el contenedor
WORKDIR /usr/share/nginx/html

# Copia los archivos estáticos al contenedor
COPY ./index.html .
COPY ./css/style.css ./css/
COPY ./js/translator.js ./js/
COPY ./assets/ ./assets/

# Puerto expuesto por el contenedor
EXPOSE 9090

# Comando de inicio del servidor
CMD ["nginx", "-g", "daemon off;"]
