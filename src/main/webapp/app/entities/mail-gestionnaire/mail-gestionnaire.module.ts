import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetChimieSharedModule } from 'app/shared';
import {
    MailGestionnaireComponent,
    MailGestionnaireDetailComponent,
    MailGestionnaireUpdateComponent,
    MailGestionnaireDeletePopupComponent,
    MailGestionnaireDeleteDialogComponent,
    mailGestionnaireRoute,
    mailGestionnairePopupRoute
} from './';

const ENTITY_STATES = [...mailGestionnaireRoute, ...mailGestionnairePopupRoute];

@NgModule({
    imports: [ProjetChimieSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MailGestionnaireComponent,
        MailGestionnaireDetailComponent,
        MailGestionnaireUpdateComponent,
        MailGestionnaireDeleteDialogComponent,
        MailGestionnaireDeletePopupComponent
    ],
    entryComponents: [
        MailGestionnaireComponent,
        MailGestionnaireUpdateComponent,
        MailGestionnaireDeleteDialogComponent,
        MailGestionnaireDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieMailGestionnaireModule {}
