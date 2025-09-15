<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CategoryService
{
    /**
     * Get all categories with product count.
     */
    public function getAllWithProductCount()
    {
        return Category::withCount('products')->get();
    }

    /**
     * Get a category by ID with its products.
     */
    public function getByIdWithProducts(int $id)
    {
        return Category::with('products')->findOrFail($id);
    }

    /**
     * Create a new category.
     */
    public function create(array $data): Category
    {
        $categoryData = $this->prepareData($data);
        return Category::create($categoryData);
    }

    /**
     * Update a category.
     */
    public function update(Category $category, array $data): Category
    {
        $categoryData = $this->prepareData($data, $category);
        $category->update($categoryData);
        return $category->fresh();
    }

    /**
     * Delete a category and its associated image.
     */
    public function delete(Category $category): bool
    {
        if ($category->image) {
            $this->deleteImage($category->image);
        }

        return $category->delete();
    }

    /**
     * Prepare data for category creation/update.
     */
    private function prepareData(array $data, ?Category $category = null): array
    {
        $categoryData = [
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ];

        // Handle image upload
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            // Delete old image if updating
            if ($category && $category->image) {
                $this->deleteImage($category->image);
            }
            
            $categoryData['image'] = $this->storeImage($data['image']);
        }

        return $categoryData;
    }

    /**
     * Store uploaded image.
     */
    private function storeImage(UploadedFile $image): string
    {
        return $image->store('categories', 'public');
    }

    /**
     * Delete image from storage.
     */
    private function deleteImage(string $imagePath): void
    {
        Storage::disk('public')->delete($imagePath);
    }
}
