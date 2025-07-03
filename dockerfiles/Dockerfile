###
# Dockerfile usado para consutruir la imagen del egraficos
#
# Antes de construir la imagen debemos haber compilado previamente el proyecto (desde el directorio raíz):
#
# mvn clean package
#
# A continuación podremos construir la imagen ejecutando siempre desde el directorio raíz del proyecto:
#
# docker build -f dockerfiles/Dockerfile -t egraficos:<version> .
#
# Para ejecutar un contenedor asociado a esta imagen:
# docker run -i --rm -p 8080:80 egraficos:<version>
#
###
FROM nginx:alpine
COPY ./build /usr/share/nginx/html

EXPOSE 80
