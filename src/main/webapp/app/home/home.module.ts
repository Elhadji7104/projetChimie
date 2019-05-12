import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import { HOME_ROUTE, EMPRUNTPRODUIT, HomeComponent, RECHERCHE, EMPRUNTPRODUITID, PROCESSUS, PROCESSUSDETAIL, PROCESSUSMODIF } from './';

import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule, DataTableModule, DropdownModule, InputSwitchModule, MultiSelectModule, SplitButtonModule } from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { AutoCompleteModule } from 'primeng/autocomplete';
@NgModule({
    imports: [
        ProjetChimieSharedModule,
        RouterModule.forChild([HOME_ROUTE, EMPRUNTPRODUIT, RECHERCHE, EMPRUNTPRODUITID, PROCESSUS, PROCESSUSDETAIL, PROCESSUSMODIF]),
        InputMaskModule,
        InputTextModule,
        TableModule,
        DataTableModule,
        BrowserModule,
        BrowserAnimationsModule,
        MultiSelectModule,
        InputSwitchModule,
        DropdownModule,
        ButtonModule,
        SplitButtonModule,
        TooltipModule,
        PaginatorModule,
        AutoCompleteModule
    ],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieHomeModule {}
