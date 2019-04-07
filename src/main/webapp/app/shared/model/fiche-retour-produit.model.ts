import { Moment } from 'moment';
import { IFicheArticle } from 'app/shared/model//fiche-article.model';
import { User } from 'app/core';

export interface IFicheRetourProduit {
    user?: User;
    id?: number;
    quantite?: number;
    dateRetour?: Moment;
    ficheArticle?: IFicheArticle;
}

export class FicheRetourProduit implements IFicheRetourProduit {
    constructor(
        public id?: number,
        public quantite?: number,
        public dateRetour?: Moment,
        public ficheArticle?: IFicheArticle,
        public user?: User
    ) {}
}
