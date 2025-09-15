<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Services\CategoryService;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Actions\Category\CreateCategoryAction;
use App\Actions\Category\UpdateCategoryAction;
use App\Actions\Category\DeleteCategoryAction;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(
        private CategoryService $categoryService,
        private CreateCategoryAction $createCategoryAction,
        private UpdateCategoryAction $updateCategoryAction,
        private DeleteCategoryAction $deleteCategoryAction
    ) {
        $this->middleware('permission:view categories')->only(['index', 'show']);
        $this->middleware('permission:create categories')->only(['create', 'store']);
        $this->middleware('permission:edit categories')->only(['edit', 'update']);
        $this->middleware('permission:delete categories')->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = $this->categoryService->getAllWithProductCount();
        
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryStoreRequest $request)
    {
        $this->createCategoryAction->execute($request);

        return redirect()->route('categories.index')
            ->with('success', 'Categoría creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $category = $this->categoryService->getByIdWithProducts($category->id);
        
        return Inertia::render('Categories/Show', [
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryUpdateRequest $request, Category $category)
    {
        $this->updateCategoryAction->execute($category, $request);

        return redirect()->route('categories.index')
            ->with('success', 'Categoría actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->deleteCategoryAction->execute($category);

        return redirect()->route('categories.index')
            ->with('success', 'Categoría eliminada exitosamente.');
    }
}
