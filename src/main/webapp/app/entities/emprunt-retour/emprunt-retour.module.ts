import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';

import { EmpruntRetourComponent, empruntRetourRoute } from './';
import { ProjetChimieFicheEmpruntProduitModule } from 'app/entities/fiche-emprunt-produit';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

const ENTITY_STATES = [...empruntRetourRoute];

@NgModule({
    imports: [
        ProjetChimieSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        TabMenuModule,
        ProjetChimieFicheEmpruntProduitModule,
        MenuItem
    ],

    declarations: [EmpruntRetourComponent],
    entryComponents: [EmpruntRetourComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetEmpruntRetourModule {}
