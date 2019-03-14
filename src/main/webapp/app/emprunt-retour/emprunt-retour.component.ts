import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'jhi-emprunt-retour',
    templateUrl: './emprunt-retour.component.html',
    styles: []
})
export class EmpruntRetourComponent implements OnInit {
    @ViewChild('menuItems') menu: MenuItem[];
    private activeItem: any;

    constructor() {}

    empruntRetour: MenuItem[];
    choix = true;
    produitChoix: any;
    quantite: any;

    ngOnInit() {
        this.empruntRetour = [
            {
                label: 'Emprunt',
                icon: 'fa fa-fw fa-bar-chart',
                command: event => {
                    console.log(this.choix);
                    this.choix = false;
                }
            },
            {
                label: 'Retour',
                icon: 'fa fa-fw fa-calendar',
                command: event => {
                    console.log(this.choix);
                    this.choix = true;
                }
            }
        ];
        console.log(this.empruntRetour);
    }
}
