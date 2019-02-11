import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFicheArticle } from 'app/shared/model/fiche-article.model';

@Component({
    selector: 'jhi-fiche-article-detail',
    templateUrl: './fiche-article-detail.component.html'
})
export class FicheArticleDetailComponent implements OnInit {
    ficheArticle: IFicheArticle;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheArticle }) => {
            this.ficheArticle = ficheArticle;
        });
    }

    previousState() {
        window.history.back();
    }
}
