<?php

namespace App\Actions\Product;

use App\Models\Product;
use App\Services\ProductService;
use App\Http\Requests\ProductUpdateRequest;

class UpdateProductAction
{
    public function __construct(
        private ProductService $productService
    ) {}

    /**
     * Execute the action to update a product.
     */
    public function execute(Product $product, ProductUpdateRequest $request): Product
    {
        $data = $request->validated();
        
        return $this->productService->update($product, $data);
    }
}
