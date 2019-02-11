import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';

type EntityResponseType = HttpResponse<ITypeDeConditionnement>;
type EntityArrayResponseType = HttpResponse<ITypeDeConditionnement[]>;

@Injectable({ providedIn: 'root' })
export class TypeDeConditionnementService {
    public resourceUrl = SERVER_API_URL + 'api/type-de-conditionnements';

    constructor(protected http: HttpClient) {}

    create(typeDeConditionnement: ITypeDeConditionnement): Observable<EntityResponseType> {
        return this.http.post<ITypeDeConditionnement>(this.resourceUrl, typeDeConditionnement, { observe: 'response' });
    }

    update(typeDeConditionnement: ITypeDeConditionnement): Observable<EntityResponseType> {
        return this.http.put<ITypeDeConditionnement>(this.resourceUrl, typeDeConditionnement, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITypeDeConditionnement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITypeDeConditionnement[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
