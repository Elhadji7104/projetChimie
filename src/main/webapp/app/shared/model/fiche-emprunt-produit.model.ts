import { Moment } from 'moment';
import { IFicheArticle } from 'app/shared/model//fiche-article.model';

export interface IFicheEmpruntProduit {
    id?: number;
    quantite?: number;
    dateEmprunt?: Moment;
    ficheArticle?: IFicheArticle;
}

export class FicheEmpruntProduit implements IFicheEmpruntProduit {
    constructor(public id?: number, public quantite?: number, public dateEmprunt?: Moment, public ficheArticle?: IFicheArticle) {}
}
