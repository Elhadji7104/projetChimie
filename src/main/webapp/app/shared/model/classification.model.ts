import { IFicheArticle } from 'app/shared/model//fiche-article.model';

export interface IClassification {
    id?: number;
    nomClassification?: string;
    ficheArticles?: IFicheArticle[];
}

export class Classification implements IClassification {
    constructor(public id?: number, public nomClassification?: string, public ficheArticles?: IFicheArticle[]) {}
}
