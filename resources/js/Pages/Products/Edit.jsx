import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ product, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Editar Producto" />
            
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">Editar Producto</h2>

                            {product.image && (
                                <div className="mb-4">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.name}
                                        className="w-32 h-32 object-cover rounded"
                                    />
                                </div>
                            )}

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
                                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <InputLabel htmlFor="price" value="Precio" />
                                        <TextInput
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            required
                                        />
                                        {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="stock" value="Stock" />
                                        <TextInput
                                            id="stock"
                                            type="number"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={data.stock}
                                            onChange={(e) => setData('stock', e.target.value)}
                                            required
                                        />
                                        {errors.stock && <div className="text-red-500 text-sm mt-1">{errors.stock}</div>}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="category_id" value="Categoría" />
                                    <select
                                        id="category_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="image" value="Nueva Imagen (opcional)" />
                                    <input
                                        id="image"
                                        type="file"
                                        className="mt-1 block w-full"
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <a
                                        href={route('products.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Cancelar
                                    </a>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Actualizando...' : 'Actualizar'}
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
