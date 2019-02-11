import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    ListeGroupeInviteComponent,
    ListeGroupeInviteDetailComponent,
    ListeGroupeInviteUpdateComponent,
    ListeGroupeInviteDeletePopupComponent,
    ListeGroupeInviteDeleteDialogComponent,
    listeGroupeInviteRoute,
    listeGroupeInvitePopupRoute
} from './';

const ENTITY_STATES = [...listeGroupeInviteRoute, ...listeGroupeInvitePopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ListeGroupeInviteComponent,
        ListeGroupeInviteDetailComponent,
        ListeGroupeInviteUpdateComponent,
        ListeGroupeInviteDeleteDialogComponent,
        ListeGroupeInviteDeletePopupComponent
    ],
    entryComponents: [
        ListeGroupeInviteComponent,
        ListeGroupeInviteUpdateComponent,
        ListeGroupeInviteDeleteDialogComponent,
        ListeGroupeInviteDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieListeGroupeInviteModule {}
