import { IGroupe } from 'app/shared/model//groupe.model';

export interface IListeGroupeInvite {
    id?: number;
    nomGroupe?: string;
    groupe?: IGroupe;
}

export class ListeGroupeInvite implements IListeGroupeInvite {
    constructor(public id?: number, public nomGroupe?: string, public groupe?: IGroupe) {}
}
