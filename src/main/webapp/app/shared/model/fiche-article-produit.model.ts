import { IClassification } from 'app/shared/model//classification.model';
import { DisponibliteArticle } from 'app/shared/model/fiche-article.model';

export interface IFicheArticleProduit {
    idArticle?: number;
    idProduit?: number;
    codeBarre?: string;
    disponibliteArticle?: DisponibliteArticle;
    classifications?: IClassification[];
    cas?: string;
    nom?: string;
    formule?: string;
    acronyme?: string;
    quantite?: number;
    typeLieuStockage?: string;
}

export class FicheArticleProduit implements IFicheArticleProduit {
    constructor(
        public idArticle?: number,
        public idProduit?: number,
        public codeBarre?: string,
        public disponibliteArticle?: DisponibliteArticle,
        public classifications?: IClassification[],
        public cas?: string,
        public nom?: string,
        public formule?: string,
        public acronyme?: string,
        public quantite?: number,
        public typeLieuStockage?: string
    ) {}
}
