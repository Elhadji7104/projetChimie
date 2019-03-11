import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import { ListeLocalisationComponent, listeLocalisationRoute } from './';

const ENTITY_STATES = [...listeLocalisationRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ListeLocalisationComponent],
    entryComponents: [ListeLocalisationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetListeLocalisationModule {}
