import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMailGestionnaire } from 'app/shared/model/mail-gestionnaire.model';

type EntityResponseType = HttpResponse<IMailGestionnaire>;
type EntityArrayResponseType = HttpResponse<IMailGestionnaire[]>;

@Injectable({ providedIn: 'root' })
export class MailGestionnaireService {
    public resourceUrl = SERVER_API_URL + 'api/mail-gestionnaires';

    constructor(protected http: HttpClient) {}

    create(mailGestionnaire: IMailGestionnaire): Observable<EntityResponseType> {
        return this.http.post<IMailGestionnaire>(this.resourceUrl, mailGestionnaire, { observe: 'response' });
    }

    update(mailGestionnaire: IMailGestionnaire): Observable<EntityResponseType> {
        return this.http.put<IMailGestionnaire>(this.resourceUrl, mailGestionnaire, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMailGestionnaire>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMailGestionnaire[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
