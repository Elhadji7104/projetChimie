import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListeMotsCles } from 'app/shared/model/liste-mots-cles.model';

@Component({
    selector: 'jhi-liste-mots-cles-detail',
    templateUrl: './liste-mots-cles-detail.component.html'
})
export class ListeMotsClesDetailComponent implements OnInit {
    listeMotsCles: IListeMotsCles;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ listeMotsCles }) => {
            this.listeMotsCles = listeMotsCles;
        });
    }

    previousState() {
        window.history.back();
    }
}
