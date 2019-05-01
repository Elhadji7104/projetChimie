import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Route = {
    path: 'settings',
    component: SettingsComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_VALIDEUR', 'ROLE_GESTIONNAIRE_DE_BASE', 'ROLE_HYGIENE_ET_SECURITE'],
        pageTitle: 'global.menu.account.settings'
    },
    canActivate: [UserRouteAccessService]
};
