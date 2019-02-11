import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUnite } from 'app/shared/model/unite.model';

@Component({
    selector: 'jhi-unite-detail',
    templateUrl: './unite-detail.component.html'
})
export class UniteDetailComponent implements OnInit {
    unite: IUnite;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ unite }) => {
            this.unite = unite;
        });
    }

    previousState() {
        window.history.back();
    }
}
