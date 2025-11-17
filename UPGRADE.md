# UPGRADE - Proceso de actualización entre versiones

*Para actualizar de una versión a otra es suficiente con actualizar el JAR a la última versión. El siguiente listado presenta aquellos cambios de versión en los que no es suficiente con actualizar y que requieren por parte del instalador tener más cosas en cuenta. Si el cambio de versión engloba varios cambios de versión del listado, estos han de ejecutarse en orden de más antiguo a más reciente.*

*De esta forma, si tuviéramos una instalación en una versión **A.B.C** y quisieramos actualizar a una versión posterior **X.Y.Z** para la cual existan versiones anteriores que incluyan cambios listados en este documento, se deberá realizar la actualización pasando por todas estas versiones antes de poder llegar a la versión deseada.*

*EJEMPLO: Queremos actualizar desde la versión 1.0.0 a la 3.0.0 y existe un cambio en la base de datos en la actualización de la versión 1.0.0 a la 2.0.0.*

*Se deberá realizar primero la actualización de la versión 1.0.0 a la 2.0.0 y luego desde la 2.0.0 a la 3.0.0*


## 1.11.0 a 1.11.1-SNAPSHOT
* Es necesario ejecutar el siguiente script SQL, donde se incluye la api-key para llamadas a apis:

```
etc/changes-from-release/1.11.0/db/common-metadata/postgresql/20250926_create_edatos_graphs_api_key.sql
```
* Se ha modificado el fichero application.json para añadir la propiedad "edatos.graphs.rest.api_key"

## 1.1.0 a 1.2.0
* Se ha modificado el fichero application.json para permitir las siguientes propiedades cuando la opción de mapas está habilitada en dicho fichero:
  * maps.defaultsWMS: permite múltiples valores estableciendo el valor de las siguientes propiedades:
    * maps.defaultsWMS.key: Nombre del WMS
    * maps.defaultsWMS.value: Url del WMS
* Debe modificarse en el fichero application.json en el proyecto de sistemas para adecuar estas propiedades en función del entorno/cliente.

## 0.0.0 a 1.1.0
* Proceso de instalación definido en el archivo README.md