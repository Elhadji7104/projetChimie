import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    FicheRetourProduitComponent,
    FicheRetourProduitDetailComponent,
    FicheRetourProduitUpdateComponent,
    FicheRetourProduitDeletePopupComponent,
    FicheRetourProduitDeleteDialogComponent,
    ficheRetourProduitRoute,
    ficheRetourProduitPopupRoute
} from './';

const ENTITY_STATES = [...ficheRetourProduitRoute, ...ficheRetourProduitPopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FicheRetourProduitComponent,
        FicheRetourProduitDetailComponent,
        FicheRetourProduitUpdateComponent,
        FicheRetourProduitDeleteDialogComponent,
        FicheRetourProduitDeletePopupComponent
    ],
    entryComponents: [
        FicheRetourProduitComponent,
        FicheRetourProduitUpdateComponent,
        FicheRetourProduitDeleteDialogComponent,
        FicheRetourProduitDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieFicheRetourProduitModule {}
