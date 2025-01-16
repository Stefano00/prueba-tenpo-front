Frontend: Prueba Full Stack

Este proyecto corresponde al frontend de la Prueba Full Stack para Tenpo, que permite gestionar transacciones a través de una interfaz web moderna y responsiva desarrollada en React.
Índice

    Descripción del proyecto
    Características principales
    Estructura del proyecto
    Requisitos previos
    Ejecución local
    Ejecución con Docker
    Uso de la aplicación
    Detalles técnicos / Endpoints consumidos
    Mejoras pendientes
    Criterios de evaluación
    Créditos

Descripción del proyecto

El frontend de esta prueba técnica ofrece una interfaz de usuario para:

    Listar transacciones existentes.
    Crear nuevas transacciones.
    Editar transacciones existentes (Sólo monto y giro).
    Eliminar transacciones.

Está construido utilizando React, con axios para las llamadas al API. Incluye validaciones básicas en los formularios y consume los endpoints expuestos por el backend (por defecto se encuentra en http://localhost:8080).
Características principales

    Interfaz moderna y responsiva: desarrollada en React, con un diseño sencillo pero funcional con los colores de Tenpo.
    Manejo de formularios: incluye validaciones para campos como monto, giro y tenpistaName.
    Ruteo: utiliza react-router-dom para la navegación entre páginas (listado, formulario de creación, formulario de edición).
    Paginación: la lista de transacciones está paginada para mostrar un número definido de resultados por página. La paginación está hecha por front-end, no por backend.
    CRUD completo: permite crear, leer, actualizar y eliminar transacciones.

Estructura del proyecto

La aplicación está organizada de la siguiente manera (principales carpetas y archivos):

.
├── src
│   ├── assets
│   │   └── images
│   │       └── tenpo-logo.svg
│   ├── components
│   │   ├── TransactionForm.jsx      # Componente para crear/editar transacciones
│   │   └── TransactionList.jsx      # Componente para listar transacciones
│   ├── pages
│   │   ├── TransactionsPage.jsx     # Página que muestra el listado de transacciones
│   │   ├── NewTransactionPage.jsx   # Página para crear una nueva transacción
│   │   └── EditTransactionPage.jsx  # Página para editar una transacción existente
│   ├── App.jsx                      # Configuración principal de rutas
│   └── index.js                    
├── Dockerfile                       
├── package.json
├── package-lock.json
└── README.md                   

Requisitos previos

    Node.js (versión 14 o superior).
    npm (gestor de paquetes que viene con Node.js).
    Docker (opcional para despliegue en contenedores).

Ejecución local

    Clonar o descargar el repositorio:

git clone https://github.com/tunombre/prueba-fullstack-frontend.git
cd prueba-fullstack-frontend

Instalar dependencias:

npm install

En caso de conflictos de dependencias, puedes usar:

npm install --legacy-peer-deps

Iniciar la aplicación:

npm run start

Esto iniciará la aplicación en modo desarrollo. Normalmente estará disponible en:

http://localhost:3000


Nota: Asegúrate de que el backend esté corriendo en http://localhost:8080.

Ejecución con Docker
Construcción de la imagen

    Construir la imagen localmente:

docker build -t stefano00123/prueba-tenpo-fullstack:latest .


Ejecutar el contenedor:

docker run -p 3000:80 stefano00123/prueba-tenpo-fullstack:latest

Una vez levantado, podrás acceder a la aplicación en:

    http://localhost:3000


Imagen en Docker Hub

Si no se desea construir la imagen localmente, puedes darle pull a la imagen desde Docker Hub:

   docker pull stefano00123/prueba-tenpo-fullstack:latest

y luego ejecutarla:

docker run -p 3000:80 stefano00123/prueba-tenpo-fullstack:latest

Nota: Asegúrate de que el backend también se ejecute en un contenedor (o localmente) y que la URL http://localhost:8080 sea accesible desde el contenedor del frontend (generalmente usando Docker Compose, puedes mapear los puertos correspondientes).
Uso de la aplicación

Una vez iniciado el frontend (local o en Docker) y teniendo el backend en ejecución, podrás acceder a:

    Listado de Transacciones: En la ruta /transaction (o en la raíz / si no has configurado otra). Muestra una tabla con todas las transacciones existentes. Incluye:
        Paginación para mostrar un número fijo de transacciones por página.
        Botón de Editar para modificar una transacción específica.
        Botón de Eliminar para borrar una transacción.

    Crear Nueva Transacción: En la ruta /transaction/new. Muestra un formulario con validaciones para:
        monto (sólo números no negativos).
        giro.
        tenpistaName.

    Crear Nueva Transacción: Si el nombre de la persona no existe, se crea, si la persona existe, se reutiliza. 
    Editar Transacción: En la ruta /transaction/:id/edit. Permite modificar sólo los datos de monto y giro de una transacción existente. Si la transacción se edita correctamente, vuelve al listado.

Detalles técnicos / Endpoints consumidos

La aplicación hace uso de axios para realizar las peticiones al backend. Actualmente, las URLs se encuentran apuntando a:

    GET http://localhost:8080/transaction
    Recupera el listado completo de transacciones.

    GET http://localhost:8080/transaction/:id
    Obtiene la información de una transacción específica.

    POST http://localhost:8080/transaction
    Crea una transacción nueva.

    PUT http://localhost:8080/transaction/:id
    Actualiza los datos de una transacción existente.

    DELETE http://localhost:8080/transaction/:id
    Elimina una transacción.


Mejoras pendientes

    Variable de entorno para la URL de la API: Evitar hardcodear la dirección http://localhost:8080 y permitir configurarla vía .env.
    Uso de react-query y caché: Por tiempo se despriorizó implementar react-query para centralizar la gestión de datos (fetch, caché, invalidación, etc.), reduciendo las peticiones al backend innecesarias.
    Manejo más avanzado de errores: Mostrar mensajes de error más detallados o amigables al usuario en lugar de simples alertas.
    Pruebas unitarias: Aumentar la cobertura con pruebas en componentes y funciones clave, utilizando librerías como Jest o React Testing Library.
    

Créditos

    Autor: Stefano Marín Quintana
    Proyecto: Prueba técnica para Tenpo.