import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ roles, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    const handleRoleChange = (roleId, checked) => {
        if (checked) {
            setData('roles', [...data.roles, roleId]);
        } else {
            setData('roles', data.roles.filter(id => id !== roleId));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Nuevo Usuario" />
            
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">Nuevo Usuario</h2>

                            <form onSubmit={handleSubmit}>
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
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="password" value="Contraseña" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        className="mt-1 block w-full"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        className="mt-1 block w-full"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    {errors.password_confirmation && <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>}
                                </div>

                                <div className="mb-4">
                                    <InputLabel value="Roles" />
                                    <div className="mt-2 space-y-2">
                                        {roles.map((role) => (
                                            <label key={role.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                    checked={data.roles.includes(role.id)}
                                                    onChange={(e) => handleRoleChange(role.id, e.target.checked)}
                                                />
                                                <span className="ml-2 text-sm text-gray-600">{role.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.roles && <div className="text-red-500 text-sm mt-1">{errors.roles}</div>}
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <a
                                        href={route('users.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Cancelar
                                    </a>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Guardando...' : 'Guardar'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
