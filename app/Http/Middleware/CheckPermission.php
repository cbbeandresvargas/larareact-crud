<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $permission, string $model = null): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        // Check if user has global permission
        if ($user->hasPermissionTo($permission)) {
            return $next($request);
        }

        // Check category-specific permission if model is provided
        if ($model && $request->route('category')) {
            $categoryId = $request->route('category');
            if ($user->hasCategoryPermission($categoryId, $permission)) {
                return $next($request);
            }
        }

        // Check if user is admin
        if ($user->hasRole('admin')) {
            return $next($request);
        }

        abort(403, 'No tienes permisos para realizar esta acción.');
    }
}
