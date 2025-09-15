import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ category }) {
    const handleDeleteProduct = (productId) => {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            router.delete(route('products.destroy', productId));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={category.name} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold">{category.name}</h2>
                                    <p className="text-gray-600">{category.description}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('categories.edit', category.id)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                                    >
                                        Editar Categoría
                                    </Link>
                                    <Link
                                        href={route('categories.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                                    >
                                        Volver
                                    </Link>
                                </div>
                            </div>

                            {category.image && (
                                <div className="mb-6">
                                    <img
                                        src={`/storage/${category.image}`}
                                        alt={category.name}
                                        className="w-64 h-64 object-cover rounded"
                                    />
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Productos en esta categoría</h3>
                                
                                <Link
                                    href={route('products.create', { category_id: category.id })}
                                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 inline-block"
                                >
                                    Agregar Producto
                                </Link>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {category.products.map((product) => (
                                        <div key={product.id} className="border rounded-lg p-4 shadow-sm">
                                            {product.image && (
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="w-full h-32 object-cover rounded mb-2"
                                                />
                                            )}
                                            <h4 className="font-semibold">{product.name}</h4>
                                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                                            <p className="text-lg font-bold text-green-600">${product.price}</p>
                                            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                                            <div className="flex space-x-2 mt-2">
                                                <Link
                                                    href={route('products.show', product.id)}
                                                    className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
                                                >
                                                    Ver
                                                </Link>
                                                <Link
                                                    href={route('products.edit', product.id)}
                                                    className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded text-sm"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {category.products.length === 0 && (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">No hay productos en esta categoría.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
