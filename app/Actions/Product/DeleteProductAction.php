<?php

namespace App\Actions\Product;

use App\Models\Product;
use App\Services\ProductService;

class DeleteProductAction
{
    public function __construct(
        private ProductService $productService
    ) {}

    /**
     * Execute the action to delete a product.
     */
    public function execute(Product $product): bool
    {
        return $this->productService->delete($product);
    }
}
