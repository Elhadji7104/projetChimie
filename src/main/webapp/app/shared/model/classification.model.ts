import { IFicheArticle } from 'app/shared/model//fiche-article.model';
import { IGroupe } from 'app/shared/model/groupe.model';

export interface IClassification {
    groupe?: IGroupe;
    id?: number;
    nomClassification?: string;
    ficheArticles?: IFicheArticle[];
}

export class Classification implements IClassification {
    constructor(public id?: number, public nomClassification?: string, public ficheArticles?: IFicheArticle[]) {}
}
