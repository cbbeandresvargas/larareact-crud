<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\ProductService;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Actions\Product\CreateProductAction;
use App\Actions\Product\UpdateProductAction;
use App\Actions\Product\DeleteProductAction;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService,
        private CreateProductAction $createProductAction,
        private UpdateProductAction $updateProductAction,
        private DeleteProductAction $deleteProductAction
    ) {
        $this->middleware('permission:view products')->only(['index', 'show']);
        $this->middleware('permission:create products')->only(['create', 'store']);
        $this->middleware('permission:edit products')->only(['edit', 'update']);
        $this->middleware('permission:delete products')->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = $this->productService->getAllWithCategories();
        
        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = $this->productService->getCategoriesForForm();
        
        return Inertia::render('Products/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request)
    {
        $this->createProductAction->execute($request);

        return redirect()->route('products.index')
            ->with('success', 'Producto creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product = $this->productService->getByIdWithCategory($product->id);
        
        return Inertia::render('Products/Show', [
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = $this->productService->getCategoriesForForm();
        
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdateRequest $request, Product $product)
    {
        $this->updateProductAction->execute($product, $request);

        return redirect()->route('products.index')
            ->with('success', 'Producto actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $this->deleteProductAction->execute($product);

        return redirect()->route('products.index')
            ->with('success', 'Producto eliminado exitosamente.');
    }
}
