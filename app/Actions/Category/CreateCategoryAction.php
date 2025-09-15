<?php

namespace App\Actions\Category;

use App\Models\Category;
use App\Services\CategoryService;
use App\Http\Requests\CategoryStoreRequest;

class CreateCategoryAction
{
    public function __construct(
        private CategoryService $categoryService
    ) {}

    /**
     * Execute the action to create a new category.
     */
    public function execute(CategoryStoreRequest $request): Category
    {
        $data = $request->validated();
        
        return $this->categoryService->create($data);
    }
}
