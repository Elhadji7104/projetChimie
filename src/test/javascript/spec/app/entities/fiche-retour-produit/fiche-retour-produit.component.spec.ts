/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheRetourProduitComponent } from 'app/entities/fiche-retour-produit/fiche-retour-produit.component';
import { FicheRetourProduitService } from 'app/entities/fiche-retour-produit/fiche-retour-produit.service';
import { FicheRetourProduit } from 'app/shared/model/fiche-retour-produit.model';

describe('Component Tests', () => {
    describe('FicheRetourProduit Management Component', () => {
        let comp: FicheRetourProduitComponent;
        let fixture: ComponentFixture<FicheRetourProduitComponent>;
        let service: FicheRetourProduitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheRetourProduitComponent],
                providers: []
            })
                .overrideTemplate(FicheRetourProduitComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheRetourProduitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheRetourProduitService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FicheRetourProduit(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ficheRetourProduits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
