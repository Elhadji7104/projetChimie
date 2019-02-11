import { IFicheArticle } from 'app/shared/model//fiche-article.model';

export interface ITypeDeConditionnement {
    id?: number;
    libelleConditionnement?: string;
    ficheArticle?: IFicheArticle;
}

export class TypeDeConditionnement implements ITypeDeConditionnement {
    constructor(public id?: number, public libelleConditionnement?: string, public ficheArticle?: IFicheArticle) {}
}
