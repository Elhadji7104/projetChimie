import { IListeCmr } from 'app/shared/model//liste-cmr.model';
import { IFicheArticle } from 'app/shared/model//fiche-article.model';

export interface IFicheProduitChimique {
    id?: number;
    cas?: string;
    codeProduit?: string;
    nom?: string;
    acronyme?: string;
    mm?: string;
    codeNacre?: string;
    formule?: string;
    listeCmrs?: IListeCmr[];
    ficheArticles?: IFicheArticle[];
}

export class FicheProduitChimique implements IFicheProduitChimique {
    constructor(
        public id?: number,
        public cas?: string,
        public codeProduit?: string,
        public nom?: string,
        public acronyme?: string,
        public mm?: string,
        public codeNacre?: string,
        public formule?: string,
        public listeCmrs?: IListeCmr[],
        public ficheArticles?: IFicheArticle[]
    ) {}
}
