import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ categories, flash }) {
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
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
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Gestión de Categorías</h2>
                                <Link
                                    href={route('categories.create')}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Nueva Categoría
                                </Link>
                            </div>

                            {flash?.success && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                    {flash.success}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.map((category) => (
                                    <div key={category.id} className="border rounded-lg p-4 shadow-sm">
                                        {category.image && (
                                            <img
                                                src={`/storage/${category.image}`}
                                                alt={category.name}
                                                className="w-full h-48 object-cover rounded mb-4"
                                            />
                                        )}
                                        <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                                        <p className="text-gray-600 mb-2">{category.description}</p>
                                        <p className="text-sm text-gray-500 mb-4">
                                            {category.products_count} productos
                                        </p>
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

                            {categories.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No hay categorías registradas.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
