import { IFicheArticle } from 'app/shared/model//fiche-article.model';
import { IGroupe } from 'app/shared/model/groupe.model';

export interface IClassification {
    id?: number;
    groupe?: IGroupe;
    nomClassification?: string;
    ficheArticles?: IFicheArticle[];
}

export class Classification implements IClassification {
    constructor(public id?: number, public groupe?: IGroupe, public nomClassification?: string, public ficheArticles?: IFicheArticle[]) {}
}
