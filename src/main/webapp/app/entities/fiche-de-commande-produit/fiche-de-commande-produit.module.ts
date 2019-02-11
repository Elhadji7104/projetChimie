import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    FicheDeCommandeProduitComponent,
    FicheDeCommandeProduitDetailComponent,
    FicheDeCommandeProduitUpdateComponent,
    FicheDeCommandeProduitDeletePopupComponent,
    FicheDeCommandeProduitDeleteDialogComponent,
    ficheDeCommandeProduitRoute,
    ficheDeCommandeProduitPopupRoute
} from './';

const ENTITY_STATES = [...ficheDeCommandeProduitRoute, ...ficheDeCommandeProduitPopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FicheDeCommandeProduitComponent,
        FicheDeCommandeProduitDetailComponent,
        FicheDeCommandeProduitUpdateComponent,
        FicheDeCommandeProduitDeleteDialogComponent,
        FicheDeCommandeProduitDeletePopupComponent
    ],
    entryComponents: [
        FicheDeCommandeProduitComponent,
        FicheDeCommandeProduitUpdateComponent,
        FicheDeCommandeProduitDeleteDialogComponent,
        FicheDeCommandeProduitDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieFicheDeCommandeProduitModule {}
