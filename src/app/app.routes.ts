import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { ProductDetailComponent } from './pages/products/detail/detail.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'products/list',
                component: ProductListComponent,
            },
        ],
    },
    {
        path: 'client',
        component: ClientLayoutComponent,
        children: [
            {
                path: 'products/:id',
                component: ProductDetailComponent,
            },
        ],

    },
    {
        path: '',
        component: HomepageComponent,
    },
    {
        path: '**', // Đường dẫn mặc định cho trang not found
        component: NotFoundComponent, // Component cho trang not found
    }

];
