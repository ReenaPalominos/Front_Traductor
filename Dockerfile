# Obtener una imagen base de Nginx (u otro servidor web)
FROM nginx

# Copiar los archivos HTML, CSS y JS al directorio del servidor web
COPY . /usr/share/nginx/html

# Exponer el puerto 80 para acceder al servidor web
EXPOSE 80
