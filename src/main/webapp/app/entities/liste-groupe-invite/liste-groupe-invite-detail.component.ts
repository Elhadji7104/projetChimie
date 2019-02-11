import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListeGroupeInvite } from 'app/shared/model/liste-groupe-invite.model';

@Component({
    selector: 'jhi-liste-groupe-invite-detail',
    templateUrl: './liste-groupe-invite-detail.component.html'
})
export class ListeGroupeInviteDetailComponent implements OnInit {
    listeGroupeInvite: IListeGroupeInvite;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ listeGroupeInvite }) => {
            this.listeGroupeInvite = listeGroupeInvite;
        });
    }

    previousState() {
        window.history.back();
    }
}
