import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGroupe } from 'app/shared/model/groupe.model';

@Component({
    selector: 'jhi-groupe-detail',
    templateUrl: './groupe-detail.component.html'
})
export class GroupeDetailComponent implements OnInit {
    groupe: IGroupe;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ groupe }) => {
            this.groupe = groupe;
        });
    }

    previousState() {
        window.history.back();
    }
}
