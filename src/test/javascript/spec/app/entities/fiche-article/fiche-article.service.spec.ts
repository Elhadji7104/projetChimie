/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { FicheArticleService } from 'app/entities/fiche-article/fiche-article.service';
import { IFicheArticle, FicheArticle, DisponibliteArticle } from 'app/shared/model/fiche-article.model';

describe('Service Tests', () => {
    describe('FicheArticle Service', () => {
        let injector: TestBed;
        let service: FicheArticleService;
        let httpMock: HttpTestingController;
        let elemDefault: IFicheArticle;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(FicheArticleService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new FicheArticle(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', DisponibliteArticle.DISPONIBLE, false, false);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a FicheArticle', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new FicheArticle(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a FicheArticle', async () => {
                const returnedFromService = Object.assign(
                    {
                        refArticle: 'BBBBBB',
                        etatPhysique: 'BBBBBB',
                        codeInterne: 'BBBBBB',
                        codeBarre: 'BBBBBB',
                        disponibliteArticle: 'BBBBBB',
                        typeDesuivi: true,
                        accessibilite: true
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of FicheArticle', async () => {
                const returnedFromService = Object.assign(
                    {
                        refArticle: 'BBBBBB',
                        etatPhysique: 'BBBBBB',
                        codeInterne: 'BBBBBB',
                        codeBarre: 'BBBBBB',
                        disponibliteArticle: 'BBBBBB',
                        typeDesuivi: true,
                        accessibilite: true
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a FicheArticle', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
