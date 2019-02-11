import { Moment } from 'moment';
import { IFournisseur } from 'app/shared/model//fournisseur.model';
import { IFicheArticle } from 'app/shared/model//fiche-article.model';

export interface IFicheDeCommandeProduit {
    id?: number;
    quantite?: number;
    dateDeCommande?: Moment;
    dateLivraison?: Moment;
    fournisseurs?: IFournisseur[];
    ficheArticle?: IFicheArticle;
}

export class FicheDeCommandeProduit implements IFicheDeCommandeProduit {
    constructor(
        public id?: number,
        public quantite?: number,
        public dateDeCommande?: Moment,
        public dateLivraison?: Moment,
        public fournisseurs?: IFournisseur[],
        public ficheArticle?: IFicheArticle
    ) {}
}
