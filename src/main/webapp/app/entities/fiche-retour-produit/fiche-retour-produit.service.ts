import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFicheRetourProduit } from 'app/shared/model/fiche-retour-produit.model';

type EntityResponseType = HttpResponse<IFicheRetourProduit>;
type EntityArrayResponseType = HttpResponse<IFicheRetourProduit[]>;

@Injectable({ providedIn: 'root' })
export class FicheRetourProduitService {
    public resourceUrl = SERVER_API_URL + 'api/fiche-retour-produits';

    constructor(protected http: HttpClient) {}

    create(ficheRetourProduit: IFicheRetourProduit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ficheRetourProduit);
        console.log(ficheRetourProduit);
        return this.http
            .post<IFicheRetourProduit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(ficheRetourProduit: IFicheRetourProduit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ficheRetourProduit);
        return this.http
            .put<IFicheRetourProduit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFicheRetourProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFicheRetourProduit[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(ficheRetourProduit: IFicheRetourProduit): IFicheRetourProduit {
        const copy: IFicheRetourProduit = Object.assign({}, ficheRetourProduit, {
            dateRetour:
                ficheRetourProduit.dateRetour != null && ficheRetourProduit.dateRetour.isValid()
                    ? ficheRetourProduit.dateRetour.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateRetour = res.body.dateRetour != null ? moment(res.body.dateRetour) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((ficheRetourProduit: IFicheRetourProduit) => {
                ficheRetourProduit.dateRetour = ficheRetourProduit.dateRetour != null ? moment(ficheRetourProduit.dateRetour) : null;
            });
        }
        return res;
    }
}
