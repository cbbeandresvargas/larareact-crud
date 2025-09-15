import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold mb-6">Sistema de Gestión de Productos</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="border rounded-lg p-6 shadow-sm">
                                    <h4 className="text-xl font-semibold mb-4">Gestión de Categorías</h4>
                                    <p className="text-gray-600 mb-4">
                                        Administra las categorías de productos, incluyendo subida de imágenes.
                                    </p>
                                    <Link
                                        href={route('categories.index')}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Gestionar Categorías
                                    </Link>
                                </div>

                                <div className="border rounded-lg p-6 shadow-sm">
                                    <h4 className="text-xl font-semibold mb-4">Gestión de Productos</h4>
                                    <p className="text-gray-600 mb-4">
                                        Administra los productos, precios, stock y asigna categorías.
                                    </p>
                                    <Link
                                        href={route('products.index')}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Gestionar Productos
                                    </Link>
                                </div>

                                <div className="border rounded-lg p-6 shadow-sm">
                                    <h4 className="text-xl font-semibold mb-4">Gestión de Usuarios</h4>
                                    <p className="text-gray-600 mb-4">
                                        Administra usuarios, roles y permisos del sistema.
                                    </p>
                                    <Link
                                        href={route('users.index')}
                                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Gestionar Usuarios
                                    </Link>
                                </div>

                                <div className="border rounded-lg p-6 shadow-sm">
                                    <h4 className="text-xl font-semibold mb-4">Gestión de Roles</h4>
                                    <p className="text-gray-600 mb-4">
                                        Crea y administra roles con permisos específicos.
                                    </p>
                                    <Link
                                        href={route('roles.index')}
                                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Gestionar Roles
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                                <h4 className="text-lg font-semibold mb-2">Características del Sistema:</h4>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Autenticación completa con registro y login</li>
                                    <li>CRUD completo para categorías y productos</li>
                                    <li>Relación entre categorías y productos</li>
                                    <li>Subida de archivos (imágenes) para categorías y productos</li>
                                    <li>Interfaz moderna con React e Inertia.js</li>
                                    <li>Validación de formularios</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
