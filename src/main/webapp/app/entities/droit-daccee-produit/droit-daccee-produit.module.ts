import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    DroitDacceeProduitComponent,
    DroitDacceeProduitDetailComponent,
    DroitDacceeProduitUpdateComponent,
    DroitDacceeProduitDeletePopupComponent,
    DroitDacceeProduitDeleteDialogComponent,
    droitDacceeProduitRoute,
    droitDacceeProduitPopupRoute
} from './';

const ENTITY_STATES = [...droitDacceeProduitRoute, ...droitDacceeProduitPopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DroitDacceeProduitComponent,
        DroitDacceeProduitDetailComponent,
        DroitDacceeProduitUpdateComponent,
        DroitDacceeProduitDeleteDialogComponent,
        DroitDacceeProduitDeletePopupComponent
    ],
    entryComponents: [
        DroitDacceeProduitComponent,
        DroitDacceeProduitUpdateComponent,
        DroitDacceeProduitDeleteDialogComponent,
        DroitDacceeProduitDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieDroitDacceeProduitModule {}
