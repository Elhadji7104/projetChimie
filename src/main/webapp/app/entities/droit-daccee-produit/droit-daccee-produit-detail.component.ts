import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';

@Component({
    selector: 'jhi-droit-daccee-produit-detail',
    templateUrl: './droit-daccee-produit-detail.component.html'
})
export class DroitDacceeProduitDetailComponent implements OnInit {
    droitDacceeProduit: IDroitDacceeProduit;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ droitDacceeProduit }) => {
            this.droitDacceeProduit = droitDacceeProduit;
        });
    }

    previousState() {
        window.history.back();
    }
}
