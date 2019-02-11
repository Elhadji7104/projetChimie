import { IGroupe } from 'app/shared/model//groupe.model';

export interface IMailGestionnaire {
    id?: number;
    mail?: string;
    groupe?: IGroupe;
}

export class MailGestionnaire implements IMailGestionnaire {
    constructor(public id?: number, public mail?: string, public groupe?: IGroupe) {}
}
