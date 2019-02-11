import { IFicheDeCommandeProduit } from 'app/shared/model//fiche-de-commande-produit.model';

export interface IFournisseur {
    id?: number;
    nomFournisseur?: string;
    adresse?: string;
    mail?: string;
    telephone?: string;
    ficheDeCommandeProduits?: IFicheDeCommandeProduit[];
}

export class Fournisseur implements IFournisseur {
    constructor(
        public id?: number,
        public nomFournisseur?: string,
        public adresse?: string,
        public mail?: string,
        public telephone?: string,
        public ficheDeCommandeProduits?: IFicheDeCommandeProduit[]
    ) {}
}
