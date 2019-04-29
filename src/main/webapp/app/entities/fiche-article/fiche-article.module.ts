import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    FicheArticleDetailComponent,
    FicheArticleUpdateComponent,
    FicheArticleDeletePopupComponent,
    FicheArticleDeleteDialogComponent,
    ficheArticleRoute,
    ficheArticlePopupRoute
} from './';
import { TableModule } from 'primeng/table';
import { DataTableModule, InputMaskModule, MultiSelectModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
const ENTITY_STATES = [...ficheArticleRoute, ...ficheArticlePopupRoute];

@NgModule({
    imports: [
        ProjetChimieSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        TableModule,
        DataTableModule,
        BrowserModule,
        BrowserAnimationsModule,
        MultiSelectModule,
        InputMaskModule,
        InputTextModule,
        InputSwitchModule,
        DropdownModule,
        ButtonModule,
        SplitButtonModule,
        FieldsetModule,
        CardModule
    ],
    declarations: [
        FicheArticleDetailComponent,
        FicheArticleUpdateComponent,
        FicheArticleDeleteDialogComponent,
        FicheArticleDeletePopupComponent
    ],
    entryComponents: [FicheArticleUpdateComponent, FicheArticleDeleteDialogComponent, FicheArticleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieFicheArticleModule {}
