import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';

@Component({
    selector: 'jhi-fiche-produit-chimique-detail',
    templateUrl: './fiche-produit-chimique-detail.component.html'
})
export class FicheProduitChimiqueDetailComponent implements OnInit {
    ficheProduitChimique: IFicheProduitChimique;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheProduitChimique }) => {
            this.ficheProduitChimique = ficheProduitChimique;
        });
    }

    previousState() {
        window.history.back();
    }
}
