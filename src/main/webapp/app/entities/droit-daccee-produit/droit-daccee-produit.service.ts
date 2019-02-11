import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';

type EntityResponseType = HttpResponse<IDroitDacceeProduit>;
type EntityArrayResponseType = HttpResponse<IDroitDacceeProduit[]>;

@Injectable({ providedIn: 'root' })
export class DroitDacceeProduitService {
    public resourceUrl = SERVER_API_URL + 'api/droit-daccee-produits';

    constructor(protected http: HttpClient) {}

    create(droitDacceeProduit: IDroitDacceeProduit): Observable<EntityResponseType> {
        return this.http.post<IDroitDacceeProduit>(this.resourceUrl, droitDacceeProduit, { observe: 'response' });
    }

    update(droitDacceeProduit: IDroitDacceeProduit): Observable<EntityResponseType> {
        return this.http.put<IDroitDacceeProduit>(this.resourceUrl, droitDacceeProduit, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDroitDacceeProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDroitDacceeProduit[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
