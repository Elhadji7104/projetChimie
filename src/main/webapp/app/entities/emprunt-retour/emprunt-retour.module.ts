import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import { EmpruntRetourComponent, empruntRetourRoute } from './';
import { FicheEmpruntProduitUpdateComponent } from 'app/entities/fiche-emprunt-produit';
import { FicheRetourProduitUpdateComponent } from 'app/entities/fiche-retour-produit';

const ENTITY_STATES = [...empruntRetourRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [EmpruntRetourComponent],
    entryComponents: [EmpruntRetourComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetEmpruntRetourModule {}
