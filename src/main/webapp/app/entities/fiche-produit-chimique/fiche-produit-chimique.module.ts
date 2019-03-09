import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    FicheProduitChimiqueComponent,
    FicheProduitChimiqueDetailComponent,
    FicheProduitChimiqueUpdateComponent,
    FicheProduitChimiqueDeletePopupComponent,
    FicheProduitChimiqueDeleteDialogComponent,
    ficheProduitChimiqueRoute,
    ficheProduitChimiquePopupRoute
} from './';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule, DataTableModule, DropdownModule, InputSwitchModule, MultiSelectModule, SplitButtonModule } from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const ENTITY_STATES = [...ficheProduitChimiqueRoute, ...ficheProduitChimiquePopupRoute];

@NgModule({
    imports: [
        ProjetChimieSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        InputMaskModule,
        InputTextModule,
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
        SplitButtonModule
    ],
    declarations: [
        FicheProduitChimiqueComponent,
        FicheProduitChimiqueDetailComponent,
        FicheProduitChimiqueUpdateComponent,
        FicheProduitChimiqueDeleteDialogComponent,
        FicheProduitChimiqueDeletePopupComponent
    ],
    entryComponents: [
        FicheProduitChimiqueComponent,
        FicheProduitChimiqueUpdateComponent,
        FicheProduitChimiqueDeleteDialogComponent,
        FicheProduitChimiqueDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieFicheProduitChimiqueModule {}
