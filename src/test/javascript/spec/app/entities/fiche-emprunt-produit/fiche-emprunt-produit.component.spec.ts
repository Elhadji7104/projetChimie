/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheEmpruntProduitComponent } from 'app/entities/fiche-emprunt-produit/fiche-emprunt-produit.component';
import { FicheEmpruntProduitService } from 'app/entities/fiche-emprunt-produit/fiche-emprunt-produit.service';
import { FicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';

describe('Component Tests', () => {
    describe('FicheEmpruntProduit Management Component', () => {
        let comp: FicheEmpruntProduitComponent;
        let fixture: ComponentFixture<FicheEmpruntProduitComponent>;
        let service: FicheEmpruntProduitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheEmpruntProduitComponent],
                providers: []
            })
                .overrideTemplate(FicheEmpruntProduitComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheEmpruntProduitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheEmpruntProduitService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FicheEmpruntProduit(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ficheEmpruntProduits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
