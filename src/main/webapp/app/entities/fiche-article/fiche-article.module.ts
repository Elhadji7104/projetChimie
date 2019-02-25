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
import { TableModule } from 'primeng/table';
import { DataTableModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
const ENTITY_STATES = [...ficheArticleRoute, ...ficheArticlePopupRoute];

@NgModule({
    imports: [
        ProjetChimieSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        TableModule,
        DataTableModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
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
