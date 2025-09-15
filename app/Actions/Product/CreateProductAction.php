<?php

namespace App\Actions\Product;

use App\Models\Product;
use App\Services\ProductService;
use App\Http\Requests\ProductStoreRequest;

class CreateProductAction
{
    public function __construct(
        private ProductService $productService
    ) {}

    /**
     * Execute the action to create a new product.
     */
    public function execute(ProductStoreRequest $request): Product
    {
        $data = $request->validated();
        
        return $this->productService->create($data);
    }
}
