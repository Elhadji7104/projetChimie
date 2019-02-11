import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    ListeCmrComponent,
    ListeCmrDetailComponent,
    ListeCmrUpdateComponent,
    ListeCmrDeletePopupComponent,
    ListeCmrDeleteDialogComponent,
    listeCmrRoute,
    listeCmrPopupRoute
} from './';

const ENTITY_STATES = [...listeCmrRoute, ...listeCmrPopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ListeCmrComponent,
        ListeCmrDetailComponent,
        ListeCmrUpdateComponent,
        ListeCmrDeleteDialogComponent,
        ListeCmrDeletePopupComponent
    ],
    entryComponents: [ListeCmrComponent, ListeCmrUpdateComponent, ListeCmrDeleteDialogComponent, ListeCmrDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieListeCmrModule {}
