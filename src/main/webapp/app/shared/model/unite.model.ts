import { IFicheArticle } from 'app/shared/model//fiche-article.model';

export interface IUnite {
    id?: number;
    libelleUnite?: string;
    ficheArticles?: IFicheArticle[];
}

export class Unite implements IUnite {
    constructor(public id?: number, public libelleUnite?: string, public ficheArticles?: IFicheArticle[]) {}
}
