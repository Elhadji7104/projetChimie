import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    FicheArticleComponent,
    FicheArticleDetailComponent,
    FicheArticleUpdateComponent,
    FicheArticleDeletePopupComponent,
    FicheArticleDeleteDialogComponent,
    ficheArticleRoute,
    ficheArticlePopupRoute
} from './';

const ENTITY_STATES = [...ficheArticleRoute, ...ficheArticlePopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FicheArticleComponent,
        FicheArticleDetailComponent,
        FicheArticleUpdateComponent,
        FicheArticleDeleteDialogComponent,
        FicheArticleDeletePopupComponent
    ],
    entryComponents: [
        FicheArticleComponent,
        FicheArticleUpdateComponent,
        FicheArticleDeleteDialogComponent,
        FicheArticleDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieFicheArticleModule {}
