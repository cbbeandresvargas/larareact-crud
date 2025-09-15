<?php

namespace App\Actions\Category;

use App\Models\Category;
use App\Services\CategoryService;
use App\Http\Requests\CategoryUpdateRequest;

class UpdateCategoryAction
{
    public function __construct(
        private CategoryService $categoryService
    ) {}

    /**
     * Execute the action to update a category.
     */
    public function execute(Category $category, CategoryUpdateRequest $request): Category
    {
        $data = $request->validated();
        
        return $this->categoryService->update($category, $data);
    }
}
