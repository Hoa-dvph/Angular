import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { ProductDetailComponent } from './pages/products/detail/detail.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductAddComponent } from './pages/admin/products/add/add.component';
import { ProductEditComponent } from './pages/admin/products/edit/edit.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SigninComponent } from './components/user/signin/signin.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './components/user/logout/logout.component';

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard], // Protect all admin routes
        children: [
            {
                path: 'products/list',
                component: ProductListComponent,
            },
            { path: 'products/create', component: ProductAddComponent },
            { path: 'products/:id/edit', component: ProductEditComponent },
            {
                path: 'user',
                component: UserListComponent,
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
        path: 'signup',
        component: RegisterComponent,
    },
    {
        path: 'signin',
        component: SigninComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
    { path: 'logout', component: LogoutComponent },

];
