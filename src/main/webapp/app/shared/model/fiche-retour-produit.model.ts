import { Moment } from 'moment';
import { IFicheArticle } from 'app/shared/model//fiche-article.model';

export interface IFicheRetourProduit {
    id?: number;
    quantite?: number;
    dateRetour?: Moment;
    ficheArticle?: IFicheArticle;
}

export class FicheRetourProduit implements IFicheRetourProduit {
    constructor(public id?: number, public quantite?: number, public dateRetour?: Moment, public ficheArticle?: IFicheArticle) {}
}
