import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ roles, flash }) {
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este rol?')) {
            router.delete(route('roles.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestión de Roles" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Gestión de Roles</h2>
                                <Link
                                    href={route('roles.create')}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Nuevo Rol
                                </Link>
                            </div>

                            {flash?.success && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                    {flash.success}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {roles.map((role) => (
                                    <div key={role.id} className="border rounded-lg p-6 shadow-sm">
                                        <h3 className="text-xl font-semibold mb-4">{role.name}</h3>
                                        
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Permisos:</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions.map((permission) => (
                                                    <span
                                                        key={permission.id}
                                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                                    >
                                                        {permission.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            <Link
                                                href={route('roles.show', role.id)}
                                                className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Ver
                                            </Link>
                                            <Link
                                                href={route('roles.edit', role.id)}
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(role.id)}
                                                className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {roles.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No hay roles registrados.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
