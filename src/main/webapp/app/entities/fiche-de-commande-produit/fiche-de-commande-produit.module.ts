import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ProjetChimieSharedModule } from 'app/shared';
import {
    FicheDeCommandeProduitComponent,
    FicheDeCommandeProduitDetailComponent,
    FicheDeCommandeProduitUpdateComponent,
    FicheDeCommandeProduitDeletePopupComponent,
    FicheDeCommandeProduitDeleteDialogComponent,
    ficheDeCommandeProduitRoute,
    ficheDeCommandeProduitPopupRoute
} from './';
import { TableModule } from 'primeng/table';
import {
    ButtonModule,
    DataTableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    MultiSelectModule,
    SplitButtonModule
} from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeyFilterModule } from 'primeng/keyfilter';
const ENTITY_STATES = [...ficheDeCommandeProduitRoute, ...ficheDeCommandeProduitPopupRoute];

@NgModule({
    imports: [
        ProjetChimieSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DropdownModule,
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
        KeyFilterModule
    ],
    declarations: [
        FicheDeCommandeProduitComponent,
        FicheDeCommandeProduitDetailComponent,
        FicheDeCommandeProduitUpdateComponent,
        FicheDeCommandeProduitDeleteDialogComponent,
        FicheDeCommandeProduitDeletePopupComponent
    ],
    entryComponents: [
        FicheDeCommandeProduitComponent,
        FicheDeCommandeProduitUpdateComponent,
        FicheDeCommandeProduitDeleteDialogComponent,
        FicheDeCommandeProduitDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieFicheDeCommandeProduitModule {}
