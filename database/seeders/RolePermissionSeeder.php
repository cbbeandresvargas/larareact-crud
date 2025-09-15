<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions for categories
        $categoryPermissions = [
            'view categories',
            'create categories',
            'edit categories',
            'delete categories',
        ];

        // Create permissions for products
        $productPermissions = [
            'view products',
            'create products',
            'edit products',
            'delete products',
        ];

        // Create permissions for users
        $userPermissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
        ];

        // Create permissions for roles
        $rolePermissions = [
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'assign roles',
        ];

        // Create all permissions
        $allPermissions = array_merge(
            $categoryPermissions,
            $productPermissions,
            $userPermissions,
            $rolePermissions
        );

        foreach ($allPermissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $editorRole = Role::create(['name' => 'editor']);
        $viewerRole = Role::create(['name' => 'viewer']);
        $categoryManagerRole = Role::create(['name' => 'category_manager']);

        // Assign permissions to admin (all permissions)
        $adminRole->givePermissionTo(Permission::all());

        // Assign permissions to editor (can view, create, edit but not delete)
        $editorRole->givePermissionTo([
            'view categories',
            'create categories',
            'edit categories',
            'view products',
            'create products',
            'edit products',
        ]);

        // Assign permissions to viewer (only view)
        $viewerRole->givePermissionTo([
            'view categories',
            'view products',
        ]);

        // Assign permissions to category manager (full category control, limited product control)
        $categoryManagerRole->givePermissionTo([
            'view categories',
            'create categories',
            'edit categories',
            'delete categories',
            'view products',
            'create products',
            'edit products',
        ]);

        // Create admin user
        $admin = User::create([
            'name' => 'Administrador',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');

        // Create editor user
        $editor = User::create([
            'name' => 'Editor',
            'email' => 'editor@example.com',
            'password' => bcrypt('password'),
        ]);
        $editor->assignRole('editor');

        // Create viewer user
        $viewer = User::create([
            'name' => 'Visualizador',
            'email' => 'viewer@example.com',
            'password' => bcrypt('password'),
        ]);
        $viewer->assignRole('viewer');

        // Create category manager user
        $categoryManager = User::create([
            'name' => 'Gestor de Categorías',
            'email' => 'category@example.com',
            'password' => bcrypt('password'),
        ]);
        $categoryManager->assignRole('category_manager');
    }
}
