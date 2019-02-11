import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';

@Component({
    selector: 'jhi-fiche-emprunt-produit-detail',
    templateUrl: './fiche-emprunt-produit-detail.component.html'
})
export class FicheEmpruntProduitDetailComponent implements OnInit {
    ficheEmpruntProduit: IFicheEmpruntProduit;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheEmpruntProduit }) => {
            this.ficheEmpruntProduit = ficheEmpruntProduit;
        });
    }

    previousState() {
        window.history.back();
    }
}
