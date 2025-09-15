<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    /**
     * Get all products with their categories.
     */
    public function getAllWithCategories()
    {
        return Product::with('category')->get();
    }

    /**
     * Get a product by ID with its category.
     */
    public function getByIdWithCategory(int $id)
    {
        return Product::with('category')->findOrFail($id);
    }

    /**
     * Get all categories for product forms.
     */
    public function getCategoriesForForm()
    {
        return Category::all();
    }

    /**
     * Create a new product.
     */
    public function create(array $data): Product
    {
        $productData = $this->prepareData($data);
        return Product::create($productData);
    }

    /**
     * Update a product.
     */
    public function update(Product $product, array $data): Product
    {
        $productData = $this->prepareData($data, $product);
        $product->update($productData);
        return $product->fresh();
    }

    /**
     * Delete a product and its associated image.
     */
    public function delete(Product $product): bool
    {
        if ($product->image) {
            $this->deleteImage($product->image);
        }

        return $product->delete();
    }

    /**
     * Prepare data for product creation/update.
     */
    private function prepareData(array $data, ?Product $product = null): array
    {
        $productData = [
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'price' => $data['price'],
            'stock' => $data['stock'],
            'category_id' => $data['category_id'],
        ];

        // Handle image upload
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            // Delete old image if updating
            if ($product && $product->image) {
                $this->deleteImage($product->image);
            }
            
            $productData['image'] = $this->storeImage($data['image']);
        }

        return $productData;
    }

    /**
     * Store uploaded image.
     */
    private function storeImage(UploadedFile $image): string
    {
        return $image->store('products', 'public');
    }

    /**
     * Delete image from storage.
     */
    private function deleteImage(string $imagePath): void
    {
        Storage::disk('public')->delete($imagePath);
    }
}
