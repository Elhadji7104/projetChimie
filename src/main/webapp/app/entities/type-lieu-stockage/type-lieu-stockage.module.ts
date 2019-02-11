import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    TypeLieuStockageComponent,
    TypeLieuStockageDetailComponent,
    TypeLieuStockageUpdateComponent,
    TypeLieuStockageDeletePopupComponent,
    TypeLieuStockageDeleteDialogComponent,
    typeLieuStockageRoute,
    typeLieuStockagePopupRoute
} from './';

const ENTITY_STATES = [...typeLieuStockageRoute, ...typeLieuStockagePopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TypeLieuStockageComponent,
        TypeLieuStockageDetailComponent,
        TypeLieuStockageUpdateComponent,
        TypeLieuStockageDeleteDialogComponent,
        TypeLieuStockageDeletePopupComponent
    ],
    entryComponents: [
        TypeLieuStockageComponent,
        TypeLieuStockageUpdateComponent,
        TypeLieuStockageDeleteDialogComponent,
        TypeLieuStockageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieTypeLieuStockageModule {}
