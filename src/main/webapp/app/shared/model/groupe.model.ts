import { IDroitDacceeProduit } from 'app/shared/model//droit-daccee-produit.model';
import { IMailGestionnaire } from 'app/shared/model//mail-gestionnaire.model';
import { IListeGroupeInvite } from 'app/shared/model//liste-groupe-invite.model';

export interface IGroupe {
    id?: number;
    nomGroupe?: string;
    nombreMembre?: number;
    localGroupe?: string;
    droitDacceeProduits?: IDroitDacceeProduit[];
    mailGestionnaires?: IMailGestionnaire[];
    listeGroupeInvites?: IListeGroupeInvite[];
    droitDacceeProduit?: IDroitDacceeProduit;
}

export class Groupe implements IGroupe {
    constructor(
        public id?: number,
        public nomGroupe?: string,
        public nombreMembre?: number,
        public localGroupe?: string,
        public droitDacceeProduits?: IDroitDacceeProduit[],
        public mailGestionnaires?: IMailGestionnaire[],
        public listeGroupeInvites?: IListeGroupeInvite[],
        public droitDacceeProduit?: IDroitDacceeProduit
    ) {}
}
