import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    TypeDeConditionnementComponent,
    TypeDeConditionnementDetailComponent,
    TypeDeConditionnementUpdateComponent,
    TypeDeConditionnementDeletePopupComponent,
    TypeDeConditionnementDeleteDialogComponent,
    typeDeConditionnementRoute,
    typeDeConditionnementPopupRoute
} from './';

const ENTITY_STATES = [...typeDeConditionnementRoute, ...typeDeConditionnementPopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TypeDeConditionnementComponent,
        TypeDeConditionnementDetailComponent,
        TypeDeConditionnementUpdateComponent,
        TypeDeConditionnementDeleteDialogComponent,
        TypeDeConditionnementDeletePopupComponent
    ],
    entryComponents: [
        TypeDeConditionnementComponent,
        TypeDeConditionnementUpdateComponent,
        TypeDeConditionnementDeleteDialogComponent,
        TypeDeConditionnementDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieTypeDeConditionnementModule {}
