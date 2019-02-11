import { IGroupe } from 'app/shared/model//groupe.model';
import { IFicheArticle } from 'app/shared/model//fiche-article.model';

export interface IDroitDacceeProduit {
    id?: number;
    nom?: string;
    nomGroupe?: string;
    etatDroit?: boolean;
    groupes?: IGroupe[];
    ficheArticles?: IFicheArticle[];
    groupe?: IGroupe;
}

export class DroitDacceeProduit implements IDroitDacceeProduit {
    constructor(
        public id?: number,
        public nom?: string,
        public nomGroupe?: string,
        public etatDroit?: boolean,
        public groupes?: IGroupe[],
        public ficheArticles?: IFicheArticle[],
        public groupe?: IGroupe
    ) {
        this.etatDroit = this.etatDroit || false;
    }
}
