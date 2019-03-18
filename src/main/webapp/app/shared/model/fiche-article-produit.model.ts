import { IClassification } from 'app/shared/model//classification.model';
import { DisponibliteArticle } from 'app/shared/model/fiche-article.model';

export interface IFicheArticleProduit {
    idArticle?: number;
    idProduit?: number;
    refArticle?: string;
    disponibliteArticle?: DisponibliteArticle;
    classifications?: IClassification[];
    cas?: string;
    nom?: string;
    acronyme?: string;
}

export class FicheArticleProduit implements IFicheArticleProduit {
    constructor(
        public idArticle?: number,
        public idProduit?: number,
        public refArticle?: string,
        public disponibliteArticle?: DisponibliteArticle,
        public classifications?: IClassification[],
        public cas?: string,
        public nom?: string,
        public acronyme?: string
    ) {}
}