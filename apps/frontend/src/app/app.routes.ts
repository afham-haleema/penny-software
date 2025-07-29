import { Route } from '@angular/router';
import {AuthComonent } from './components/auth.component';
import {  ShopComponent } from './components/shop.component';
import { AuthGuard } from './auth/auth.guard';
import { ResetPassword } from './components/reset-password';

export const appRoutes: Route[] = [
    {
        path:'',
        redirectTo:'shop',
        pathMatch:'full'
    },
    {
        path:'auth',
        component:AuthComonent
    },
    {
        path:'shop',
        component:ShopComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'reset-password',
        component:ResetPassword
    }
];
