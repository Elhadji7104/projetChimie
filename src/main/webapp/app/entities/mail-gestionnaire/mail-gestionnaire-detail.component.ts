import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMailGestionnaire } from 'app/shared/model/mail-gestionnaire.model';

@Component({
    selector: 'jhi-mail-gestionnaire-detail',
    templateUrl: './mail-gestionnaire-detail.component.html'
})
export class MailGestionnaireDetailComponent implements OnInit {
    mailGestionnaire: IMailGestionnaire;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mailGestionnaire }) => {
            this.mailGestionnaire = mailGestionnaire;
        });
    }

    previousState() {
        window.history.back();
    }
}
