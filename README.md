# Trabajo Práctico N° 3 - Sprint 3 [Nodo Tecnológico]

Este proyecto implementa un sistema de gestión de superhéroes, desarrollado como parte del Sprint 3 del Nodo Tecnológico. Utiliza Node.js, Express, MongoDB y EJS para crear un CRUD completo con una interfaz intuitiva y moderna.

## Características principales

1. **Estructura MVC:** Organización modular del proyecto en controladores, servicios, modelos y vistas.
2. **Base de Datos:** Configuración de MongoDB con validaciones robustas en el esquema.
3. **CRUD completo:**
   - Crear, editar, listar y eliminar superhéroes.
   - Validaciones tanto en frontend como en backend para garantizar la integridad de los datos.
4. **Diseño responsivo:** Interfaz diseñada con **TailwindCSS** para una experiencia de usuario optimizada.
5. **Vistas dinámicas:** Uso de EJS para renderizar vistas dinámicas:
   - `dashboard.ejs`: Lista de superhéroes con opciones de edición y eliminación.
   - `addSuperhero.ejs`: Formulario para agregar superhéroes.
   - `editSuperhero.ejs`: Formulario para editar superhéroes existentes.

## Endpoints disponibles

### API REST
- **GET** `/api/heroes` - Listar todos los superhéroes.
- **GET** `/api/heroes/:id` - Obtener detalles de un superhéroe.
- **POST** `/api/heroes/agregar` - Crear un nuevo superhéroe.
- **PUT** `/api/heroes/:id` - Actualizar un superhéroe.
- **DELETE** `/api/heroes/:id` - Eliminar un superhéroe.

### Vistas
- **GET** `/api/heroes` - Dashboard con la lista de superhéroes.
- **GET** `/api/heroes/agregar` - Formulario para agregar superhéroes.
- **GET** `/api/heroes/:id/editar` - Formulario para editar un superhéroe.

## Requisitos para Ejecutar el Proyecto
1. Node.js instalado.
2. MongoDB configurado.
3. Clonar el repositorio.

## Autor
- Desarrollado por Lucas Nieto ✨