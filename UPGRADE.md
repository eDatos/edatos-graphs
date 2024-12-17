# UPGRADE - Proceso de actualización entre versiones

*Para actualizar de una versión a otra es suficiente con actualizar el JAR a la última versión. El siguiente listado presenta aquellos cambios de versión en los que no es suficiente con actualizar y que requieren por parte del instalador tener más cosas en cuenta. Si el cambio de versión engloba varios cambios de versión del listado, estos han de ejecutarse en orden de más antiguo a más reciente.*

*De esta forma, si tuviéramos una instalación en una versión **A.B.C** y quisieramos actualizar a una versión posterior **X.Y.Z** para la cual existan versiones anteriores que incluyan cambios listados en este documento, se deberá realizar la actualización pasando por todas estas versiones antes de poder llegar a la versión deseada.*

*EJEMPLO: Queremos actualizar desde la versión 1.0.0 a la 3.0.0 y existe un cambio en la base de datos en la actualización de la versión 1.0.0 a la 2.0.0.*

*Se deberá realizar primero la actualización de la versión 1.0.0 a la 2.0.0 y luego desde la 2.0.0 a la 3.0.0*


## 1.2.0 a 1.3.0
* Se ha modificado el fichero application.json para permitir las siguientes propiedades cuando la opción de mapas está habilitada en dicho fichero:
  * maps.defaultsWMS: permite múltiples valores estableciendo el valor de las siguientes propiedades:
    * maps.defaultsWMS.key: Nombre del WMS
    * maps.defaultsWMS.value: Url del WMS
* Debe modificarse en el fichero application.json en el proyecto de sistemas para adecuar estas propiedades en función del entorno/cliente.

## 0.0.0 a 1.0.0
* El fichero application.json, a parte de definir las propiedades de metadata por cliente, permite la configuración relacionada con los mapas:
  * maps.enable: permite habilitar o no la sección de mapas de la aplicación
  * maps.bing_key: propiedad para definir la clave necesaria para usar mapas de bing
  * maps.mapbox_url: url para el uso de mapas mapbox
  * maps.center: propiedad usada para definir donde debe centrarse el mapa por defecto
  * maps.zoom: propiedad usada para definir el zoom inicial del mapa
* Debe modificarse en el fichero application.json en el proyecto de sistemas para adecuar estas propiedades en función del entorno/cliente.
* Proceso de instalación definido en el archivo README.md