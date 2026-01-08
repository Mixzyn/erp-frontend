import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { PdvComponent } from './pages/pdv/pdv.component';
import { ListProductsComponent } from './pages/products/list-products/list-products.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { SingleProductComponent } from './pages/products/single-product/single-product.component';
import { productResolver } from './guards/product.resolver';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { SingleUserComponent } from './pages/users/single-user/single-user.component';
import { userResolver } from './guards/user.resolver';
import { adminGuard } from './guards/admin.guard';
import { PixComponent } from './pages/pdv/pix/pix.component';
import { ListSalesComponent } from './pages/sales/list-sales/list-sales.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'login',
        component: SigninComponent
    },
    {
        path: 'cadastrar',
        component: SignupComponent
    },
    {
        path: '',
        component: LayoutComponent,
        pathMatch: 'prefix',
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'pdv',
                component: PdvComponent,
            },
            {
                path: 'produtos',
                component: ListProductsComponent,
            },
            {
                path: 'cadastrar-produto',
                component: AddProductComponent,
            },
            {
                path: 'produto/:id',
                component: SingleProductComponent,
                resolve: {
                    product: productResolver,
                },
            },
            {
                path: 'vendas',
                component: ListSalesComponent,
            },
        ]
    },
    {
        path: 'pix',
        component: PixComponent,
        canActivate: [authGuard]
    },
    {
        path: 'admin',
        component: LayoutComponent,
        canActivateChild: [adminGuard],
        children: [
            {
                path: 'usuarios',
                component: ListUsersComponent,
            },
            {
                path: 'cadastrar-usuario',
                component: AddUserComponent,
            },
            {
                path: 'usuario/:id',
                component: SingleUserComponent,
                resolve: {
                    user: userResolver,
                },
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'home'
    },
];
