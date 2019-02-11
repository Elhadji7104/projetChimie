import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalisation } from 'app/shared/model/localisation.model';

@Component({
    selector: 'jhi-localisation-detail',
    templateUrl: './localisation-detail.component.html'
})
export class LocalisationDetailComponent implements OnInit {
    localisation: ILocalisation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ localisation }) => {
            this.localisation = localisation;
        });
    }

    previousState() {
        window.history.back();
    }
}
