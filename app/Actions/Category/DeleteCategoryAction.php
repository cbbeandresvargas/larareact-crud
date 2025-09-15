<?php

namespace App\Actions\Category;

use App\Models\Category;
use App\Services\CategoryService;

class DeleteCategoryAction
{
    public function __construct(
        private CategoryService $categoryService
    ) {}

    /**
     * Execute the action to delete a category.
     */
    public function execute(Category $category): bool
    {
        return $this->categoryService->delete($category);
    }
}
