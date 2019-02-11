import { ILocalisation } from 'app/shared/model//localisation.model';

export interface ITypeLieuStockage {
    id?: number;
    libelleLieu?: string;
    temperature?: number;
    localisation?: ILocalisation;
}

export class TypeLieuStockage implements ITypeLieuStockage {
    constructor(public id?: number, public libelleLieu?: string, public temperature?: number, public localisation?: ILocalisation) {}
}
