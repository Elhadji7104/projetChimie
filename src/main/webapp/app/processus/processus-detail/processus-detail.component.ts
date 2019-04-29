import { Component, OnInit } from '@angular/core';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-processus-detail',
    templateUrl: './processus-detail.component.html',
    styles: []
})
export class ProcessusDetailComponent implements OnInit {
    /*ficheArticle: IFicheArticle;*/

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        /* this.activatedRoute.data.subscribe(({ ficheArticle }) => {
            this.ficheArticle = ficheArticle;
            console.log(this.ficheArticle);
        });*/
    }

    previousState() {
        window.history.back();
    }

    gotoLien(lien: string) {
        window.location.href = lien;
    }
}
