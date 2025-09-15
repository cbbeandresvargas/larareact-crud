# Guía Completa: Laravel + Inertia.js + React

Esta guía explica cómo funciona Laravel con Inertia.js y React, cubriendo todos los aspectos desde migraciones hasta el frontend.

## 📋 Tabla de Contenidos

1. [Introducción a Inertia.js](#introducción-a-inertiajs)
2. [Configuración Inicial](#configuración-inicial)
3. [Migraciones](#migraciones)
4. [Modelos Eloquent](#modelos-eloquent)
5. [Controladores](#controladores)
6. [Rutas](#rutas)
7. [Vistas y Plantillas](#vistas-y-plantillas)
8. [Almacenamiento](#almacenamiento)
9. [Autenticación](#autenticación)
10. [Frontend con React](#frontend-con-react)
11. [Flujo de Datos](#flujo-de-datos)
12. [Mejores Prácticas](#mejores-prácticas)

---

## 🚀 Introducción a Inertia.js

**Inertia.js** es un framework que permite crear aplicaciones SPA (Single Page Application) usando controladores del lado del servidor y componentes del lado del cliente, sin necesidad de una API.

### Características Principales:
- **Sin API**: No necesitas crear endpoints REST/GraphQL
- **Controladores tradicionales**: Usa controladores de Laravel normales
- **Componentes del cliente**: React, Vue o Svelte
- **Navegación fluida**: Sin recargas de página
- **Estado compartido**: Datos compartidos entre el servidor y cliente

---

## ⚙️ Configuración Inicial

### 1. Instalación de Paquetes

```bash
# Backend (Laravel)
composer require inertiajs/inertia-laravel

# Frontend (React)
npm install @inertiajs/react react react-dom @vitejs/plugin-react
```

### 2. Configuración de Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
});
```

### 3. Middleware de Inertia

```php
// bootstrap/app.php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->web(append: [
        \App\Http\Middleware\HandleInertiaRequests::class,
    ]);
})
```

---

## 🗄️ Migraciones

Las migraciones definen la estructura de la base de datos.

### Ejemplo de Migración

```php
// database/migrations/create_categories_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
```

### Comandos de Migración

```bash
# Crear migración
php artisan make:migration create_categories_table

# Ejecutar migraciones
php artisan migrate

# Revertir migración
php artisan migrate:rollback

# Ver estado de migraciones
php artisan migrate:status
```

---

## 🏗️ Modelos Eloquent

Los modelos representan las tablas de la base de datos y manejan las relaciones.

### Modelo Básico

```php
// app/Models/Category.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image',
    ];

    // Relación uno a muchos
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
```

### Relaciones Comunes

```php
// Uno a muchos
public function products(): HasMany
{
    return $this->hasMany(Product::class);
}

// Muchos a uno
public function category(): BelongsTo
{
    return $this->belongsTo(Category::class);
}

// Muchos a muchos
public function tags(): BelongsToMany
{
    return $this->belongsToMany(Tag::class);
}
```

---

## 🎮 Controladores

Los controladores manejan la lógica de la aplicación y retornan respuestas Inertia.

### Controlador Básico

```php
// app/Http/Controllers/CategoryController.php
<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('products')->get();
        
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Category::create($request->validated());

        return redirect()->route('categories.index')
            ->with('success', 'Categoría creada exitosamente.');
    }
}
```

### Respuestas Inertia

```php
// Renderizar página
return Inertia::render('ComponentName', [
    'data' => $data,
    'user' => auth()->user(),
]);

// Redirección con mensaje
return redirect()->route('dashboard')
    ->with('success', 'Operación exitosa');

// Redirección con datos
return redirect()->back()
    ->with('errors', $validator->errors());
```

---

## 🛣️ Rutas

Las rutas conectan URLs con controladores.

### Rutas Web

```php
// routes/web.php
use App\Http\Controllers\CategoryController;

// Rutas de recursos
Route::resource('categories', CategoryController::class);

// Rutas individuales
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified']);

// Rutas con middleware
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit']);
    Route::patch('/profile', [ProfileController::class, 'update']);
});
```

### Rutas de API (si es necesario)

```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
```

---

## 🎨 Vistas y Plantillas

### Plantilla Principal

```blade
<!-- resources/views/app.blade.php -->
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    
    @routes
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>
```

### Configuración de Inertia

```php
// app/Http/Middleware/HandleInertiaRequests.php
public function share(Request $request): array
{
    return [
        ...parent::share($request),
        'auth' => [
            'user' => $request->user(),
        ],
        'ziggy' => fn () => [
            ...(new Ziggy)->toArray(),
            'location' => $request->url(),
        ],
        'csrf_token' => csrf_token(),
    ];
}
```

---

## 💾 Almacenamiento

### Configuración de Storage

```php
// config/filesystems.php
'disks' => [
    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL').'/storage',
        'visibility' => 'public',
    ],
],
```

### Subida de Archivos

```php
// En el controlador
public function store(Request $request)
{
    $request->validate([
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $data = $request->validated();

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('categories', 'public');
    }

    Category::create($data);
}
```

### Enlace Simbólico

```bash
# Crear enlace simbólico para acceso público
php artisan storage:link
```

---

## 🔐 Autenticación

### Laravel Breeze

```bash
# Instalar Breeze
composer require laravel/breeze --dev
php artisan breeze:install react --ssr
```

### Middleware de Autenticación

```php
// Rutas protegidas
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::resource('categories', CategoryController::class);
});
```

### Verificación de Usuario

```php
// En controladores
public function index()
{
    $user = auth()->user();
    $categories = Category::where('user_id', $user->id)->get();
    
    return Inertia::render('Categories/Index', [
        'categories' => $categories
    ]);
}
```

---

## ⚛️ Frontend con React

### Configuración Principal

```jsx
// resources/js/app.jsx
import './bootstrap';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
```

### Componente de Página

```jsx
// resources/js/Pages/Categories/Index.jsx
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ categories, flash }) {
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro?')) {
            router.delete(route('categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Categorías" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">Categorías</h2>
                            
                            {flash?.success && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                    {flash.success}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.map((category) => (
                                    <div key={category.id} className="border rounded-lg p-4 shadow-sm">
                                        <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                                        <p className="text-gray-600 mb-2">{category.description}</p>
                                        
                                        <div className="flex space-x-2">
                                            <Link
                                                href={route('categories.show', category.id)}
                                                className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Ver
                                            </Link>
                                            <Link
                                                href={route('categories.edit', category.id)}
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

### Formularios con Inertia

```jsx
// resources/js/Pages/Categories/Create.jsx
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('categories.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Nueva Categoría" />
            
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="description" value="Descripción" />
                    <textarea
                        id="description"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        rows="4"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="image" value="Imagen" />
                    <input
                        id="image"
                        type="file"
                        className="mt-1 block w-full"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files[0])}
                    />
                </div>

                <PrimaryButton disabled={processing}>
                    {processing ? 'Guardando...' : 'Guardar'}
                </PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );
}
```

---

## 🔄 Flujo de Datos

### 1. Petición HTTP
```
Usuario hace clic en enlace → Navegador envía petición HTTP
```

### 2. Rutas
```
routes/web.php → Encuentra ruta correspondiente
```

### 3. Middleware
```
Middleware de autenticación → Middleware de Inertia
```

### 4. Controlador
```
Controlador procesa petición → Valida datos → Ejecuta lógica de negocio
```

### 5. Modelo
```
Modelo interactúa con base de datos → Retorna datos
```

### 6. Respuesta Inertia
```
Inertia::render() → Envía datos al frontend
```

### 7. Frontend React
```
React recibe datos → Renderiza componente → Actualiza DOM
```

---

## 🎯 Mejores Prácticas

### 1. Organización de Archivos
```
resources/js/
├── Components/          # Componentes reutilizables
├── Layouts/            # Layouts principales
├── Pages/              # Páginas de la aplicación
│   ├── Categories/
│   └── Products/
└── app.jsx            # Punto de entrada
```

### 2. Naming Conventions
- **Páginas**: PascalCase (ej: `Categories/Index.jsx`)
- **Componentes**: PascalCase (ej: `PrimaryButton.jsx`)
- **Layouts**: PascalCase (ej: `AuthenticatedLayout.jsx`)

### 3. Manejo de Estado
```jsx
// Usar useForm para formularios
const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
});

// Usar router para navegación
import { router } from '@inertiajs/react';

router.post('/users', data);
router.delete('/users/1');
```

### 4. Validación
```jsx
// Mostrar errores de validación
{errors.name && <div className="text-red-500">{errors.name}</div>}

// Mostrar mensajes de éxito
{flash?.success && <div className="bg-green-100">{flash.success}</div>}
```

### 5. Optimización
```php
// Cargar relaciones necesarias
$categories = Category::with('products')->get();

// Paginación
$products = Product::paginate(15);

// Lazy loading
$category = Category::with(['products' => function($query) {
    $query->latest()->take(5);
}])->find($id);
```

---

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Compilar assets en modo desarrollo
php artisan serve        # Iniciar servidor Laravel

# Producción
npm run build           # Compilar assets para producción
php artisan optimize    # Optimizar aplicación

# Base de datos
php artisan migrate     # Ejecutar migraciones
php artisan migrate:fresh --seed  # Recrear BD con datos de prueba

# Cache
php artisan config:clear    # Limpiar cache de configuración
php artisan route:clear     # Limpiar cache de rutas
php artisan view:clear      # Limpiar cache de vistas
```

---

## 🔧 Troubleshooting

### Problemas Comunes

1. **Error 419 Page Expired**
   - Verificar que el token CSRF esté presente
   - Limpiar cache del navegador

2. **Componentes no se cargan**
   - Verificar que los archivos estén en la ruta correcta
   - Comprobar que el nombre del componente coincida

3. **Datos no se pasan correctamente**
   - Verificar que los datos se pasen en el controlador
   - Comprobar que las props se reciban en el componente

4. **Rutas no funcionan**
   - Verificar que las rutas estén definidas correctamente
   - Comprobar que el middleware esté configurado

---

Esta guía cubre todos los aspectos esenciales de Laravel con Inertia.js y React. Con esta base, puedes crear aplicaciones SPA robustas y mantenibles sin necesidad de una API separada.
