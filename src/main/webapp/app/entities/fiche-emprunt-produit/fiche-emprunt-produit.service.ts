import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';

type EntityResponseType = HttpResponse<IFicheEmpruntProduit>;
type EntityArrayResponseType = HttpResponse<IFicheEmpruntProduit[]>;

@Injectable({ providedIn: 'root' })
export class FicheEmpruntProduitService {
    public resourceUrl = SERVER_API_URL + 'api/fiche-emprunt-produits';

    constructor(protected http: HttpClient) {}

    create(ficheEmpruntProduit: IFicheEmpruntProduit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ficheEmpruntProduit);
        return this.http
            .post<IFicheEmpruntProduit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(ficheEmpruntProduit: IFicheEmpruntProduit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ficheEmpruntProduit);
        return this.http
            .put<IFicheEmpruntProduit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFicheEmpruntProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFicheEmpruntProduit[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(ficheEmpruntProduit: IFicheEmpruntProduit): IFicheEmpruntProduit {
        const copy: IFicheEmpruntProduit = Object.assign({}, ficheEmpruntProduit, {
            dateEmprunt:
                ficheEmpruntProduit.dateEmprunt != null && ficheEmpruntProduit.dateEmprunt.isValid()
                    ? ficheEmpruntProduit.dateEmprunt.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateEmprunt = res.body.dateEmprunt != null ? moment(res.body.dateEmprunt) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((ficheEmpruntProduit: IFicheEmpruntProduit) => {
                ficheEmpruntProduit.dateEmprunt = ficheEmpruntProduit.dateEmprunt != null ? moment(ficheEmpruntProduit.dateEmprunt) : null;
            });
        }
        return res;
    }
}
