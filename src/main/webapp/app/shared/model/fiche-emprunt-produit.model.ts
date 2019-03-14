import { Moment } from 'moment';
import { IFicheArticle } from 'app/shared/model//fiche-article.model';
import { IUser, User } from 'app/core';

export interface IFicheEmpruntProduit {
    demandeur?: User;
    id?: number;
    quantite?: number;
    dateEmprunt?: Moment;
    ficheArticle?: IFicheArticle;
}

export class FicheEmpruntProduit implements IFicheEmpruntProduit {
    constructor(
        public id?: number,
        public quantite?: number,
        public dateEmprunt?: Moment,
        public ficheArticle?: IFicheArticle,
        public demandeur?: User
    ) {}
}
