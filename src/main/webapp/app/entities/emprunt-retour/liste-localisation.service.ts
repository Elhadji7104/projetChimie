import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClassification } from 'app/shared/model/classification.model';

type EntityResponseType = HttpResponse<IClassification>;
type EntityArrayResponseType = HttpResponse<IClassification[]>;

@Injectable({ providedIn: 'root' })
export class ListeLocalisationService {
    public resourceUrl = SERVER_API_URL + 'api/classifications';

    constructor(protected http: HttpClient) {}

    create(classification: IClassification): Observable<EntityResponseType> {
        return this.http.post<IClassification>(this.resourceUrl, classification, { observe: 'response' });
    }

    update(classification: IClassification): Observable<EntityResponseType> {
        return this.http.put<IClassification>(this.resourceUrl, classification, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IClassification>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClassification[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
