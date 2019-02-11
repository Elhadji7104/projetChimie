import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';

@Component({
    selector: 'jhi-type-lieu-stockage-detail',
    templateUrl: './type-lieu-stockage-detail.component.html'
})
export class TypeLieuStockageDetailComponent implements OnInit {
    typeLieuStockage: ITypeLieuStockage;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ typeLieuStockage }) => {
            this.typeLieuStockage = typeLieuStockage;
        });
    }

    previousState() {
        window.history.back();
    }
}
