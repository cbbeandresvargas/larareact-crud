import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ product }) {
    const handleDelete = () => {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            router.delete(route('products.destroy', product.id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={product.name} />
            
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold">{product.name}</h2>
                                    <p className="text-gray-600">{product.description}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('products.edit', product.id)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                                    >
                                        Editar Producto
                                    </Link>
                                    <Link
                                        href={route('products.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                                    >
                                        Volver
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    {product.image && (
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-full h-64 object-cover rounded"
                                        />
                                    )}
                                </div>
                                
                                <div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Información del Producto</h3>
                                        <div className="space-y-2">
                                            <p><span className="font-medium">Precio:</span> <span className="text-green-600 text-xl font-bold">${product.price}</span></p>
                                            <p><span className="font-medium">Stock:</span> {product.stock} unidades</p>
                                            <p><span className="font-medium">Categoría:</span> 
                                                <Link 
                                                    href={route('categories.show', product.category.id)}
                                                    className="text-blue-600 hover:text-blue-800 ml-1"
                                                >
                                                    {product.category.name}
                                                </Link>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                                        <p className="text-gray-700">{product.description || 'Sin descripción'}</p>
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handleDelete}
                                            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                                        >
                                            Eliminar Producto
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
