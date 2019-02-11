/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheProduitChimiqueComponent } from 'app/entities/fiche-produit-chimique/fiche-produit-chimique.component';
import { FicheProduitChimiqueService } from 'app/entities/fiche-produit-chimique/fiche-produit-chimique.service';
import { FicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';

describe('Component Tests', () => {
    describe('FicheProduitChimique Management Component', () => {
        let comp: FicheProduitChimiqueComponent;
        let fixture: ComponentFixture<FicheProduitChimiqueComponent>;
        let service: FicheProduitChimiqueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheProduitChimiqueComponent],
                providers: []
            })
                .overrideTemplate(FicheProduitChimiqueComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheProduitChimiqueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheProduitChimiqueService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FicheProduitChimique(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ficheProduitChimiques[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
