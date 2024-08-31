# Usar la imagen oficial de PHP con Apache
FROM php:8.3-apache

# Instalar extensiones de PHP y Composer
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo pdo_mysql

# Habilitar mod_rewrite para Laravel
RUN a2enmod rewrite

# Configurar el ServerName para evitar advertencias
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copiar el contenido del proyecto al contenedor
COPY . /var/www/html

# Instalar las dependencias de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --prefer-dist

# Asignar permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Asegurarse de que el archivo index.php esté presente
RUN touch /var/www/html/index.php

# Exponer el puerto 80
EXPOSE 8000

# Comando por defecto
CMD ["apache2-foreground"]