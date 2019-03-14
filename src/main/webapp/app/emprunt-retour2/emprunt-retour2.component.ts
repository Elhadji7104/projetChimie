import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { FicheEmpruntProduitService } from 'app/entities/fiche-emprunt-produit';
import { FicheArticleService } from 'app/entities/fiche-article';
import { JhiAlertService } from 'ng-jhipster';
import { FicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';

@Component({
    selector: 'jhi-emprunt-retour2',
    templateUrl: './emprunt-retour2.component.html',
    styles: []
})
export class EmpruntRetour2Component implements OnInit {
    emprunt: FicheEmpruntProduit = new FicheEmpruntProduit();

    constructor(
        private accountService: AccountService,
        protected jhiAlertService: JhiAlertService,
        protected ficheEmpruntProduitService: FicheEmpruntProduitService,
        protected ficheArticleService: FicheArticleService
    ) {}

    ngOnInit() {}

    foo() {
        console.log(this.emprunt.demandeur);
    }

    save() {
        this.ficheEmpruntProduitService.create(this.emprunt).subscribe(result => {
            this.emprunt = result.body;
        });
    }
}
