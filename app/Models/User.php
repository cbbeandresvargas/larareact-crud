<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Traits\HasPermissions;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, HasPermissions;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get category-specific permissions for this user.
     */
    public function categoryPermissions()
    {
        return $this->hasMany(UserCategoryPermission::class);
    }

    /**
     * Check if user has permission for a specific category.
     */
    public function hasCategoryPermission($categoryId, $permission)
    {
        // Check if user has global permission
        if ($this->hasPermissionTo($permission)) {
            return true;
        }

        // Check category-specific permission
        $categoryPermission = $this->categoryPermissions()
            ->where('category_id', $categoryId)
            ->first();

        if ($categoryPermission) {
            $permissions = json_decode($categoryPermission->permissions, true);
            return in_array($permission, $permissions);
        }

        return false;
    }

    /**
     * Set category-specific permissions for this user.
     */
    public function setCategoryPermissions($categoryId, $permissions)
    {
        $this->categoryPermissions()->updateOrCreate(
            ['category_id' => $categoryId],
            ['permissions' => json_encode($permissions)]
        );
    }

    /**
     * Get all categories this user has access to.
     */
    public function accessibleCategories()
    {
        return Category::whereHas('userCategoryPermissions', function ($query) {
            $query->where('user_id', $this->id);
        })->orWhereDoesntHave('userCategoryPermissions')->get();
    }
}
