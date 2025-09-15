import axios from 'axios';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Configurar axios para incluir el token CSRF
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Obtener el token CSRF del meta tag
const token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Configurar Inertia para usar axios
window.axios = axios;