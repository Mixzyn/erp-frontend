import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './pages/products/products.component';

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
        path: "signup",
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
                path: "products",
                component: ProductsComponent,
            }
        ]
    },
    {
        path: "**",
        redirectTo: "home"
    },
];
