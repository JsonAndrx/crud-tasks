
## CRUD API TASKs

Para clonar este proyecto
```bash
  git clone https://github.com/JsonAndrx/crud-tasks.git
```
### Instalacion del Backend 
```bash
  cd .\api-tasks\ 
```
Instalacion de dependencia con composer
```bash
  composer install
```
Ahora corramos las migraciones en nuesta Bd, pero ten en cuenta que debes tener un servidore de PostgreSQL ejecutandose con una bd llamada task_db (para mas informacion revise la configuracion de bd en el archivo database.php)

```bash
  php artisan migrate
```
Continuemos corriendo los Seed para la creacion del usuario por defecto para hacer login y obtener el token para acceder a los recursos protegidos


```bash
  php artisan db:seed --class=UserSeeder
```
Y con eso ya tendrias listo el Backend listo para ejecutarse y poder acceder a todos los recursos, recuerda loguear y obtener el token para poder hacer el crud

```bash
  php artisan serve
```

Aqui tienes los endpoints ya listos para ser usados desde postman:
https://documenter.getpostman.com/view/26062397/2sAXjKbsiv


### Instalacion del Frontend

Este proyecto no esta dockerizado hasta la creacion de este readme asi que tenga en cuenta que debe tener el backend corriendo y el front a la vez para que todo funcione de la mejor manera

```bash
  npm run install
```

Ahora hagamos funcionar el front

```bash
  npm run start
```

Y con eso ya tendrias listo el proyecto de crud api tasks.



