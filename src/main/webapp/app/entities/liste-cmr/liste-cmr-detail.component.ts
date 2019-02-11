import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListeCmr } from 'app/shared/model/liste-cmr.model';

@Component({
    selector: 'jhi-liste-cmr-detail',
    templateUrl: './liste-cmr-detail.component.html'
})
export class ListeCmrDetailComponent implements OnInit {
    listeCmr: IListeCmr;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ listeCmr }) => {
            this.listeCmr = listeCmr;
        });
    }

    previousState() {
        window.history.back();
    }
}
