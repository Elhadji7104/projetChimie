import { IFicheProduitChimique } from 'app/shared/model//fiche-produit-chimique.model';

export interface IListeCmr {
    id?: number;
    refListe?: string;
    ficheProduitChimique?: IFicheProduitChimique;
}

export class ListeCmr implements IListeCmr {
    constructor(public id?: number, public refListe?: string, public ficheProduitChimique?: IFicheProduitChimique) {}
}
