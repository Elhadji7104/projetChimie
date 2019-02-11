import { IFicheArticle } from 'app/shared/model//fiche-article.model';

export interface IListeMotsCles {
    id?: number;
    libelleMot?: string;
    ficheArticle?: IFicheArticle;
}

export class ListeMotsCles implements IListeMotsCles {
    constructor(public id?: number, public libelleMot?: string, public ficheArticle?: IFicheArticle) {}
}
