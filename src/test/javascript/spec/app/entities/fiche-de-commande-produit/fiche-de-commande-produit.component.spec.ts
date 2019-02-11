/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheDeCommandeProduitComponent } from 'app/entities/fiche-de-commande-produit/fiche-de-commande-produit.component';
import { FicheDeCommandeProduitService } from 'app/entities/fiche-de-commande-produit/fiche-de-commande-produit.service';
import { FicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';

describe('Component Tests', () => {
    describe('FicheDeCommandeProduit Management Component', () => {
        let comp: FicheDeCommandeProduitComponent;
        let fixture: ComponentFixture<FicheDeCommandeProduitComponent>;
        let service: FicheDeCommandeProduitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheDeCommandeProduitComponent],
                providers: []
            })
                .overrideTemplate(FicheDeCommandeProduitComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheDeCommandeProduitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheDeCommandeProduitService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FicheDeCommandeProduit(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ficheDeCommandeProduits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
