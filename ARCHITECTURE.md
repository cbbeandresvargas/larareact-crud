# Arquitectura del Sistema - Laravel + React + Inertia.js

Este documento describe la arquitectura implementada en el sistema de gestión de productos, siguiendo principios de Clean Architecture y separación de responsabilidades.

## 📁 Estructura de Directorios

```
app/
├── Actions/                    # Acciones específicas del dominio
│   ├── Category/
│   │   ├── CreateCategoryAction.php
│   │   ├── UpdateCategoryAction.php
│   │   └── DeleteCategoryAction.php
│   └── Product/
│       ├── CreateProductAction.php
│       ├── UpdateProductAction.php
│       └── DeleteProductAction.php
├── Http/
│   ├── Controllers/            # Controladores (solo coordinación)
│   │   ├── CategoryController.php
│   │   └── ProductController.php
│   └── Requests/               # Form Requests para validación
│       ├── CategoryStoreRequest.php
│       ├── CategoryUpdateRequest.php
│       ├── ProductStoreRequest.php
│       └── ProductUpdateRequest.php
├── Models/                     # Modelos Eloquent
│   ├── Category.php
│   └── Product.php
└── Services/                   # Lógica de negocio
    ├── CategoryService.php
    └── ProductService.php
```

## 🏗️ Patrones de Arquitectura Implementados

### 1. **Form Requests** - Validación de Datos
- **Propósito**: Centralizar la validación de datos de entrada
- **Ubicación**: `app/Http/Requests/`
- **Responsabilidades**:
  - Validar datos de entrada
  - Proporcionar mensajes de error personalizados
  - Autorizar o denegar el acceso a la acción

**Ejemplo**:
```php
class CategoryStoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
```

### 2. **Services** - Lógica de Negocio
- **Propósito**: Contener la lógica de negocio y operaciones complejas
- **Ubicación**: `app/Services/`
- **Responsabilidades**:
  - Manejar operaciones de base de datos
  - Gestionar subida de archivos
  - Aplicar reglas de negocio
  - Coordinar múltiples operaciones

**Ejemplo**:
```php
class CategoryService
{
    public function create(array $data): Category
    {
        $categoryData = $this->prepareData($data);
        return Category::create($categoryData);
    }
    
    private function prepareData(array $data): array
    {
        // Lógica para preparar datos
    }
}
```

### 3. **Actions** - Operaciones Específicas
- **Propósito**: Encapsular operaciones específicas del dominio
- **Ubicación**: `app/Actions/`
- **Responsabilidades**:
  - Ejecutar una operación específica
  - Coordinar entre Services y Requests
  - Mantener operaciones atómicas

**Ejemplo**:
```php
class CreateCategoryAction
{
    public function execute(CategoryStoreRequest $request): Category
    {
        $data = $request->validated();
        return $this->categoryService->create($data);
    }
}
```

### 4. **Controllers** - Coordinación
- **Propósito**: Coordinar entre la capa de presentación y la lógica de negocio
- **Ubicación**: `app/Http/Controllers/`
- **Responsabilidades**:
  - Recibir peticiones HTTP
  - Delegar a Actions/Services
  - Retornar respuestas apropiadas
  - Manejar redirecciones

**Ejemplo**:
```php
class CategoryController extends Controller
{
    public function store(CategoryStoreRequest $request)
    {
        $this->createCategoryAction->execute($request);
        return redirect()->route('categories.index')
            ->with('success', 'Categoría creada exitosamente.');
    }
}
```

## 🔄 Flujo de Datos

### Crear una Categoría:
1. **Request** → `CategoryStoreRequest` valida los datos
2. **Controller** → `CategoryController@store` recibe la petición
3. **Action** → `CreateCategoryAction` ejecuta la operación
4. **Service** → `CategoryService` maneja la lógica de negocio
5. **Model** → `Category` persiste en la base de datos
6. **Response** → Redirección con mensaje de éxito

### Actualizar un Producto:
1. **Request** → `ProductUpdateRequest` valida los datos
2. **Controller** → `ProductController@update` recibe la petición
3. **Action** → `UpdateProductAction` ejecuta la operación
4. **Service** → `ProductService` maneja la lógica de negocio
5. **Model** → `Product` actualiza en la base de datos
6. **Response** → Redirección con mensaje de éxito

## ✅ Beneficios de esta Arquitectura

### 1. **Separación de Responsabilidades**
- Cada clase tiene una responsabilidad específica
- Fácil mantenimiento y testing
- Código más legible y organizado

### 2. **Reutilización de Código**
- Services pueden ser reutilizados en diferentes contextos
- Actions encapsulan operaciones que pueden ser reutilizadas
- Form Requests centralizan validaciones

### 3. **Testabilidad**
- Cada capa puede ser testeada independientemente
- Fácil mock de dependencias
- Tests más específicos y rápidos

### 4. **Mantenibilidad**
- Cambios en una capa no afectan otras
- Fácil agregar nuevas funcionalidades
- Código más limpio y organizado

### 5. **Escalabilidad**
- Fácil agregar nuevas funcionalidades
- Estructura clara para equipos grandes
- Patrones consistentes en todo el proyecto

## 🧪 Testing

### Ejemplo de Test para Action:
```php
class CreateCategoryActionTest extends TestCase
{
    public function test_can_create_category()
    {
        $request = CategoryStoreRequest::create('/categories', 'POST', [
            'name' => 'Test Category',
            'description' => 'Test Description'
        ]);
        
        $action = new CreateCategoryAction(new CategoryService());
        $category = $action->execute($request);
        
        $this->assertInstanceOf(Category::class, $category);
        $this->assertEquals('Test Category', $category->name);
    }
}
```

### Ejemplo de Test para Service:
```php
class CategoryServiceTest extends TestCase
{
    public function test_can_create_category()
    {
        $service = new CategoryService();
        $data = [
            'name' => 'Test Category',
            'description' => 'Test Description'
        ];
        
        $category = $service->create($data);
        
        $this->assertDatabaseHas('categories', [
            'name' => 'Test Category'
        ]);
    }
}
```

## 📋 Convenciones de Naming

- **Controllers**: `{Entity}Controller` (ej: `CategoryController`)
- **Services**: `{Entity}Service` (ej: `CategoryService`)
- **Actions**: `{Action}{Entity}Action` (ej: `CreateCategoryAction`)
- **Requests**: `{Entity}{Action}Request` (ej: `CategoryStoreRequest`)
- **Models**: `{Entity}` (ej: `Category`)

## 🚀 Próximos Pasos

1. **Implementar Tests**: Crear tests unitarios para cada capa
2. **Agregar Logging**: Implementar logging en Services y Actions
3. **Cache**: Agregar cache en Services para consultas frecuentes
4. **Events**: Implementar eventos para operaciones importantes
5. **API Resources**: Crear API Resources para respuestas JSON
6. **Queues**: Implementar colas para operaciones pesadas

Esta arquitectura proporciona una base sólida y escalable para el desarrollo de aplicaciones Laravel complejas, manteniendo el código limpio, testeable y mantenible.
