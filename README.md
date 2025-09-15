# Sistema CRUD Laravel + React + Inertia.js

Este es un sistema completo de gestión de productos desarrollado con Laravel, React e Inertia.js que incluye autenticación, CRUD completo, relaciones entre tablas y subida de archivos.

## Características

- ✅ **Autenticación completa**: Registro, login, logout y recuperación de contraseña
- ✅ **CRUD de Categorías**: Crear, leer, actualizar y eliminar categorías
- ✅ **CRUD de Productos**: Crear, leer, actualizar y eliminar productos
- ✅ **Relaciones**: Los productos pertenecen a categorías (relación uno a muchos)
- ✅ **Subida de archivos**: Imágenes para categorías y productos
- ✅ **Interfaz moderna**: React con Tailwind CSS
- ✅ **Validación**: Validación de formularios en frontend y backend
- ✅ **Responsive**: Diseño adaptable a diferentes dispositivos

## Tecnologías Utilizadas

- **Backend**: Laravel 12
- **Frontend**: React 18 + Inertia.js
- **Base de datos**: SQLite (por defecto)
- **Estilos**: Tailwind CSS
- **Autenticación**: Laravel Breeze
- **Subida de archivos**: Laravel Storage

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd larareact-crud
   ```

2. **Instalar dependencias de PHP**:
   ```bash
   composer install
   ```

3. **Instalar dependencias de Node.js**:
   ```bash
   npm install
   ```

4. **Configurar el archivo de entorno**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configurar la base de datos** (opcional, por defecto usa SQLite):
   - Editar `.env` si quieres usar MySQL o PostgreSQL
   - O mantener SQLite (ya configurado)

6. **Ejecutar las migraciones**:
   ```bash
   php artisan migrate
   ```

7. **Crear el enlace simbólico para el almacenamiento**:
   ```bash
   php artisan storage:link
   ```

8. **Compilar los assets**:
   ```bash
   npm run build
   # O para desarrollo:
   npm run dev
   ```

9. **Iniciar el servidor**:
   ```bash
   php artisan serve
   ```

## Uso

1. **Acceder a la aplicación**: http://localhost:8000

2. **Registrar una cuenta** o usar las credenciales de prueba

3. **Navegar por el sistema**:
   - **Dashboard**: Vista principal con enlaces a las secciones
   - **Categorías**: Gestionar categorías de productos
   - **Productos**: Gestionar productos con sus categorías

## Estructura del Proyecto

```
larareact-crud/
├── app/
│   ├── Http/Controllers/
│   │   ├── CategoryController.php
│   │   └── ProductController.php
│   └── Models/
│       ├── Category.php
│       └── Product.php
├── database/migrations/
│   ├── create_categories_table.php
│   └── create_products_table.php
├── resources/
│   ├── js/
│   │   ├── Pages/
│   │   │   ├── Categories/
│   │   │   │   ├── Index.jsx
│   │   │   │   ├── Create.jsx
│   │   │   │   ├── Edit.jsx
│   │   │   │   └── Show.jsx
│   │   │   └── Products/
│   │   │       ├── Index.jsx
│   │   │       ├── Create.jsx
│   │   │       ├── Edit.jsx
│   │   │       └── Show.jsx
│   │   └── app.jsx
│   └── views/
│       └── app.blade.php
└── routes/
    └── web.php
```

## Funcionalidades Principales

### Gestión de Categorías
- Crear categorías con nombre, descripción e imagen
- Listar todas las categorías con contador de productos
- Editar categorías existentes
- Eliminar categorías (con confirmación)
- Ver detalles de categoría con sus productos

### Gestión de Productos
- Crear productos con nombre, descripción, precio, stock, categoría e imagen
- Listar todos los productos con información de categoría
- Editar productos existentes
- Eliminar productos (con confirmación)
- Ver detalles de producto

### Subida de Archivos
- Imágenes para categorías (almacenadas en `storage/app/public/categories/`)
- Imágenes para productos (almacenadas en `storage/app/public/products/`)
- Validación de tipos de archivo (jpeg, png, jpg, gif)
- Tamaño máximo de 2MB por imagen

## Desarrollo

Para desarrollo con hot reload:

```bash
# Terminal 1: Servidor Laravel
php artisan serve

# Terminal 2: Vite para assets
npm run dev
```

## Base de Datos

### Tabla: categories
- `id` (Primary Key)
- `name` (String)
- `description` (Text, nullable)
- `image` (String, nullable)
- `created_at`, `updated_at`

### Tabla: products
- `id` (Primary Key)
- `name` (String)
- `description` (Text, nullable)
- `price` (Decimal)
- `stock` (Integer)
- `image` (String, nullable)
- `category_id` (Foreign Key)
- `created_at`, `updated_at`

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.