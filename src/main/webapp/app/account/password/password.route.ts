import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { PasswordComponent } from './password.component';

export const passwordRoute: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
        pageTitle: 'global.menu.account.password'
    },
    canActivate: [UserRouteAccessService]
};
