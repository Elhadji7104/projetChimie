import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClassification } from 'app/shared/model/classification.model';

@Component({
    selector: 'jhi-classification-detail',
    templateUrl: './classification-detail.component.html'
})
export class ClassificationDetailComponent implements OnInit {
    classification: IClassification;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ classification }) => {
            this.classification = classification;
        });
    }

    previousState() {
        window.history.back();
    }
}
