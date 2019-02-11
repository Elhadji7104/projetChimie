import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    ListeMotsClesComponent,
    ListeMotsClesDetailComponent,
    ListeMotsClesUpdateComponent,
    ListeMotsClesDeletePopupComponent,
    ListeMotsClesDeleteDialogComponent,
    listeMotsClesRoute,
    listeMotsClesPopupRoute
} from './';

const ENTITY_STATES = [...listeMotsClesRoute, ...listeMotsClesPopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ListeMotsClesComponent,
        ListeMotsClesDetailComponent,
        ListeMotsClesUpdateComponent,
        ListeMotsClesDeleteDialogComponent,
        ListeMotsClesDeletePopupComponent
    ],
    entryComponents: [
        ListeMotsClesComponent,
        ListeMotsClesUpdateComponent,
        ListeMotsClesDeleteDialogComponent,
        ListeMotsClesDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieListeMotsClesModule {}
