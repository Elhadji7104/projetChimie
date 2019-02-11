import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    UniteComponent,
    UniteDetailComponent,
    UniteUpdateComponent,
    UniteDeletePopupComponent,
    UniteDeleteDialogComponent,
    uniteRoute,
    unitePopupRoute
} from './';

const ENTITY_STATES = [...uniteRoute, ...unitePopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [UniteComponent, UniteDetailComponent, UniteUpdateComponent, UniteDeleteDialogComponent, UniteDeletePopupComponent],
    entryComponents: [UniteComponent, UniteUpdateComponent, UniteDeleteDialogComponent, UniteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieUniteModule {}
