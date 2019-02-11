import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IListeCmr } from 'app/shared/model/liste-cmr.model';

type EntityResponseType = HttpResponse<IListeCmr>;
type EntityArrayResponseType = HttpResponse<IListeCmr[]>;

@Injectable({ providedIn: 'root' })
export class ListeCmrService {
    public resourceUrl = SERVER_API_URL + 'api/liste-cmrs';

    constructor(protected http: HttpClient) {}

    create(listeCmr: IListeCmr): Observable<EntityResponseType> {
        return this.http.post<IListeCmr>(this.resourceUrl, listeCmr, { observe: 'response' });
    }

    update(listeCmr: IListeCmr): Observable<EntityResponseType> {
        return this.http.put<IListeCmr>(this.resourceUrl, listeCmr, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IListeCmr>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IListeCmr[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
