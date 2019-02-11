/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { FicheDeCommandeProduitService } from 'app/entities/fiche-de-commande-produit/fiche-de-commande-produit.service';
import { IFicheDeCommandeProduit, FicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';

describe('Service Tests', () => {
    describe('FicheDeCommandeProduit Service', () => {
        let injector: TestBed;
        let service: FicheDeCommandeProduitService;
        let httpMock: HttpTestingController;
        let elemDefault: IFicheDeCommandeProduit;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(FicheDeCommandeProduitService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new FicheDeCommandeProduit(0, 0, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateDeCommande: currentDate.format(DATE_FORMAT),
                        dateLivraison: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a FicheDeCommandeProduit', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateDeCommande: currentDate.format(DATE_FORMAT),
                        dateLivraison: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateDeCommande: currentDate,
                        dateLivraison: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new FicheDeCommandeProduit(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a FicheDeCommandeProduit', async () => {
                const returnedFromService = Object.assign(
                    {
                        quantite: 1,
                        dateDeCommande: currentDate.format(DATE_FORMAT),
                        dateLivraison: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateDeCommande: currentDate,
                        dateLivraison: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of FicheDeCommandeProduit', async () => {
                const returnedFromService = Object.assign(
                    {
                        quantite: 1,
                        dateDeCommande: currentDate.format(DATE_FORMAT),
                        dateLivraison: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateDeCommande: currentDate,
                        dateLivraison: currentDate
                    },
                    returnedFromService
                );
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

            it('should delete a FicheDeCommandeProduit', async () => {
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
