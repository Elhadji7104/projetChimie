import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';

type EntityResponseType = HttpResponse<IFicheDeCommandeProduit>;
type EntityArrayResponseType = HttpResponse<IFicheDeCommandeProduit[]>;

@Injectable({ providedIn: 'root' })
export class FicheDeCommandeProduitService {
    public resourceUrl = SERVER_API_URL + 'api/fiche-de-commande-produits';

    constructor(protected http: HttpClient) {}

    create(ficheDeCommandeProduit: IFicheDeCommandeProduit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ficheDeCommandeProduit);
        return this.http
            .post<IFicheDeCommandeProduit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(ficheDeCommandeProduit: IFicheDeCommandeProduit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ficheDeCommandeProduit);
        return this.http
            .put<IFicheDeCommandeProduit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFicheDeCommandeProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFicheDeCommandeProduit[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(ficheDeCommandeProduit: IFicheDeCommandeProduit): IFicheDeCommandeProduit {
        const copy: IFicheDeCommandeProduit = Object.assign({}, ficheDeCommandeProduit, {
            dateDeCommande:
                ficheDeCommandeProduit.dateDeCommande != null && ficheDeCommandeProduit.dateDeCommande.isValid()
                    ? ficheDeCommandeProduit.dateDeCommande.format(DATE_FORMAT)
                    : null,
            dateLivraison:
                ficheDeCommandeProduit.dateLivraison != null && ficheDeCommandeProduit.dateLivraison.isValid()
                    ? ficheDeCommandeProduit.dateLivraison.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateDeCommande = res.body.dateDeCommande != null ? moment(res.body.dateDeCommande) : null;
            res.body.dateLivraison = res.body.dateLivraison != null ? moment(res.body.dateLivraison) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((ficheDeCommandeProduit: IFicheDeCommandeProduit) => {
                ficheDeCommandeProduit.dateDeCommande =
                    ficheDeCommandeProduit.dateDeCommande != null ? moment(ficheDeCommandeProduit.dateDeCommande) : null;
                ficheDeCommandeProduit.dateLivraison =
                    ficheDeCommandeProduit.dateLivraison != null ? moment(ficheDeCommandeProduit.dateLivraison) : null;
            });
        }
        return res;
    }
}
