import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';

@Component({
    selector: 'jhi-type-de-conditionnement-detail',
    templateUrl: './type-de-conditionnement-detail.component.html'
})
export class TypeDeConditionnementDetailComponent implements OnInit {
    typeDeConditionnement: ITypeDeConditionnement;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ typeDeConditionnement }) => {
            this.typeDeConditionnement = typeDeConditionnement;
        });
    }

    previousState() {
        window.history.back();
    }
}
