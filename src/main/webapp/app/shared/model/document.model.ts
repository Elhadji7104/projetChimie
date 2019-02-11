import { IFicheArticle } from 'app/shared/model//fiche-article.model';

export interface IDocument {
    id?: number;
    lien?: string;
    ficheArticles?: IFicheArticle[];
}

export class Document implements IDocument {
    constructor(public id?: number, public lien?: string, public ficheArticles?: IFicheArticle[]) {}
}
