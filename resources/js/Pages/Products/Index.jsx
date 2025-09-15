import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ products, flash }) {
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            router.delete(route('products.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Productos" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Gestión de Productos</h2>
                                <Link
                                    href={route('products.create')}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Nuevo Producto
                                </Link>
                            </div>

                            {flash?.success && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                    {flash.success}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product.id} className="border rounded-lg p-4 shadow-sm">
                                        {product.image && (
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="w-full h-48 object-cover rounded mb-4"
                                            />
                                        )}
                                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                        <p className="text-gray-600 mb-2">{product.description}</p>
                                        <p className="text-lg font-bold text-green-600 mb-2">${product.price}</p>
                                        <p className="text-sm text-gray-500 mb-2">Stock: {product.stock}</p>
                                        <p className="text-sm text-blue-600 mb-4">Categoría: {product.category.name}</p>
                                        <div className="flex space-x-2">
                                            <Link
                                                href={route('products.show', product.id)}
                                                className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Ver
                                            </Link>
                                            <Link
                                                href={route('products.edit', product.id)}
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {products.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No hay productos registrados.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
