import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IListeMotsCles } from 'app/shared/model/liste-mots-cles.model';

type EntityResponseType = HttpResponse<IListeMotsCles>;
type EntityArrayResponseType = HttpResponse<IListeMotsCles[]>;

@Injectable({ providedIn: 'root' })
export class ListeMotsClesService {
    public resourceUrl = SERVER_API_URL + 'api/liste-mots-cles';

    constructor(protected http: HttpClient) {}

    create(listeMotsCles: IListeMotsCles): Observable<EntityResponseType> {
        return this.http.post<IListeMotsCles>(this.resourceUrl, listeMotsCles, { observe: 'response' });
    }

    update(listeMotsCles: IListeMotsCles): Observable<EntityResponseType> {
        return this.http.put<IListeMotsCles>(this.resourceUrl, listeMotsCles, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IListeMotsCles>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IListeMotsCles[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
