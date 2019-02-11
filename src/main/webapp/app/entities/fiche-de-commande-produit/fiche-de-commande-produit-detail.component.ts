import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';

@Component({
    selector: 'jhi-fiche-de-commande-produit-detail',
    templateUrl: './fiche-de-commande-produit-detail.component.html'
})
export class FicheDeCommandeProduitDetailComponent implements OnInit {
    ficheDeCommandeProduit: IFicheDeCommandeProduit;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheDeCommandeProduit }) => {
            this.ficheDeCommandeProduit = ficheDeCommandeProduit;
        });
    }

    previousState() {
        window.history.back();
    }
}
