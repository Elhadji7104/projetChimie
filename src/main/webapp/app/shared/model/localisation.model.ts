import { ITypeLieuStockage } from 'app/shared/model//type-lieu-stockage.model';
import { IFicheArticle } from 'app/shared/model//fiche-article.model';

export interface ILocalisation {
    id?: number;
    adresse?: string;
    codePostal?: string;
    ville?: string;
    pays?: string;
    quantite?: number;
    typeLieuStockages?: ITypeLieuStockage[];
    ficheArticle?: IFicheArticle;
}

export class Localisation implements ILocalisation {
    constructor(
        public id?: number,
        public adresse?: string,
        public codePostal?: string,
        public ville?: string,
        public pays?: string,
        public quantite?: number,
        public typeLieuStockages?: ITypeLieuStockage[],
        public ficheArticle?: IFicheArticle
    ) {}
}
