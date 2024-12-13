FROM wordpress:latest

# Instala nano y otras herramientas necesarias y limpia la cache de apt para reducir el tamaño de la imagen
RUN apt-get update && \
    apt-get install -y nano && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copia solo los archivos necesarios personalizados al contenedor
COPY wp-content /var/www/html/wp-content
# Si tienes otros archivos específicos, agrégalos aquí:
# COPY wp-config.php /var/www/html/wp-config.php
COPY wp-includes /var/www/html/wp-includes

COPY wp-mail.php /var/www/html/wp-mail.php
# Recomendación: usa COPY de archivos específicos para evitar sobrecargar la imagen y acelerar los tiempos de construcción.
