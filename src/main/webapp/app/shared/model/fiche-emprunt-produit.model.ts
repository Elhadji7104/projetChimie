import { Moment } from 'moment';
import { IFicheArticle } from 'app/shared/model//fiche-article.model';
import { User } from 'app/core';

export interface IFicheEmpruntProduit {
    user?: User;
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
        public user?: User
    ) {}
}
