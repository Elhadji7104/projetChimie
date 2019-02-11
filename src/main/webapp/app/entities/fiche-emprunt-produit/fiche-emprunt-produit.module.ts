import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    FicheEmpruntProduitComponent,
    FicheEmpruntProduitDetailComponent,
    FicheEmpruntProduitUpdateComponent,
    FicheEmpruntProduitDeletePopupComponent,
    FicheEmpruntProduitDeleteDialogComponent,
    ficheEmpruntProduitRoute,
    ficheEmpruntProduitPopupRoute
} from './';

const ENTITY_STATES = [...ficheEmpruntProduitRoute, ...ficheEmpruntProduitPopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FicheEmpruntProduitComponent,
        FicheEmpruntProduitDetailComponent,
        FicheEmpruntProduitUpdateComponent,
        FicheEmpruntProduitDeleteDialogComponent,
        FicheEmpruntProduitDeletePopupComponent
    ],
    entryComponents: [
        FicheEmpruntProduitComponent,
        FicheEmpruntProduitUpdateComponent,
        FicheEmpruntProduitDeleteDialogComponent,
        FicheEmpruntProduitDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieFicheEmpruntProduitModule {}
