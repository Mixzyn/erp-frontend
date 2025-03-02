import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { PdvComponent } from './pages/pdv/pdv.component';
import { ListProductsComponent } from './pages/products/list-products/list-products.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
    },
    {
        path: "login",
        component: SigninComponent
    },
    {
        path: "cadastrar",
        component: SignupComponent
    },
    {
        path: "",
        component: LayoutComponent,
        pathMatch: "prefix",
        canActivate: [authGuard],
        children: [
            {
                path: "home",
                component: HomeComponent,
            },
            {
                path: "listar-produtos",
                component: ListProductsComponent,
            },
            {
                path: "cadastrar-produto",
                component: AddProductComponent,
            },
            {
                path: "pdv",
                component: PdvComponent,
            },
        ]
    },
    {
        path: "**",
        redirectTo: "home"
    },
];
