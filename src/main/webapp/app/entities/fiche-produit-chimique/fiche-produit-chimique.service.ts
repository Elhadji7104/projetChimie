import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';

type EntityResponseType = HttpResponse<IFicheProduitChimique>;
type EntityArrayResponseType = HttpResponse<IFicheProduitChimique[]>;

@Injectable({ providedIn: 'root' })
export class FicheProduitChimiqueService {
    public resourceUrl = SERVER_API_URL + 'api/fiche-produit-chimiques';

    constructor(protected http: HttpClient) {}

    create(ficheProduitChimique: IFicheProduitChimique): Observable<EntityResponseType> {
        return this.http.post<IFicheProduitChimique>(this.resourceUrl, ficheProduitChimique, { observe: 'response' });
    }

    update(ficheProduitChimique: IFicheProduitChimique): Observable<EntityResponseType> {
        return this.http.put<IFicheProduitChimique>(this.resourceUrl, ficheProduitChimique, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFicheProduitChimique>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFicheProduitChimique[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
