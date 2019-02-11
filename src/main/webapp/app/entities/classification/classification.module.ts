import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    ClassificationComponent,
    ClassificationDetailComponent,
    ClassificationUpdateComponent,
    ClassificationDeletePopupComponent,
    ClassificationDeleteDialogComponent,
    classificationRoute,
    classificationPopupRoute
} from './';

const ENTITY_STATES = [...classificationRoute, ...classificationPopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClassificationComponent,
        ClassificationDetailComponent,
        ClassificationUpdateComponent,
        ClassificationDeleteDialogComponent,
        ClassificationDeletePopupComponent
    ],
    entryComponents: [
        ClassificationComponent,
        ClassificationUpdateComponent,
        ClassificationDeleteDialogComponent,
        ClassificationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieClassificationModule {}
