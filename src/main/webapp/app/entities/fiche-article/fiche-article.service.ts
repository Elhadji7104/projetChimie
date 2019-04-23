import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFicheArticle } from 'app/shared/model/fiche-article.model';
import { IUser } from 'app/core';

type EntityResponseType = HttpResponse<IFicheArticle>;
type EntityArrayResponseType = HttpResponse<IFicheArticle[]>;

@Injectable({ providedIn: 'root' })
export class FicheArticleService {
    public resourceUrl = SERVER_API_URL + 'api/fiche-articles';

    constructor(protected http: HttpClient) {}

    create(ficheArticle: IFicheArticle): Observable<EntityResponseType> {
        return this.http.post<IFicheArticle>(this.resourceUrl, ficheArticle, { observe: 'response' });
    }

    update(ficheArticle: IFicheArticle): Observable<EntityResponseType> {
        return this.http.put<IFicheArticle>(this.resourceUrl, ficheArticle, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFicheArticle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFicheArticle[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findUser(login: number): Observable<HttpResponse<any>> {
        console.log(login);
        return this.http.get<IUser>(`/api/users/${login}`, { observe: 'response' });
    }
}
