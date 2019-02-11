import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFicheRetourProduit } from 'app/shared/model/fiche-retour-produit.model';

@Component({
    selector: 'jhi-fiche-retour-produit-detail',
    templateUrl: './fiche-retour-produit-detail.component.html'
})
export class FicheRetourProduitDetailComponent implements OnInit {
    ficheRetourProduit: IFicheRetourProduit;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheRetourProduit }) => {
            this.ficheRetourProduit = ficheRetourProduit;
        });
    }

    previousState() {
        window.history.back();
    }
}
