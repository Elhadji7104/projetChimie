/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { DroitDacceeProduitComponent } from 'app/entities/droit-daccee-produit/droit-daccee-produit.component';
import { DroitDacceeProduitService } from 'app/entities/droit-daccee-produit/droit-daccee-produit.service';
import { DroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';

describe('Component Tests', () => {
    describe('DroitDacceeProduit Management Component', () => {
        let comp: DroitDacceeProduitComponent;
        let fixture: ComponentFixture<DroitDacceeProduitComponent>;
        let service: DroitDacceeProduitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [DroitDacceeProduitComponent],
                providers: []
            })
                .overrideTemplate(DroitDacceeProduitComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DroitDacceeProduitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DroitDacceeProduitService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DroitDacceeProduit(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.droitDacceeProduits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
