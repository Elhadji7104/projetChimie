import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IListeGroupeInvite } from 'app/shared/model/liste-groupe-invite.model';

type EntityResponseType = HttpResponse<IListeGroupeInvite>;
type EntityArrayResponseType = HttpResponse<IListeGroupeInvite[]>;

@Injectable({ providedIn: 'root' })
export class ListeGroupeInviteService {
    public resourceUrl = SERVER_API_URL + 'api/liste-groupe-invites';

    constructor(protected http: HttpClient) {}

    create(listeGroupeInvite: IListeGroupeInvite): Observable<EntityResponseType> {
        return this.http.post<IListeGroupeInvite>(this.resourceUrl, listeGroupeInvite, { observe: 'response' });
    }

    update(listeGroupeInvite: IListeGroupeInvite): Observable<EntityResponseType> {
        return this.http.put<IListeGroupeInvite>(this.resourceUrl, listeGroupeInvite, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IListeGroupeInvite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IListeGroupeInvite[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
