/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { DroitDacceeProduitDetailComponent } from 'app/entities/droit-daccee-produit/droit-daccee-produit-detail.component';
import { DroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';

describe('Component Tests', () => {
    describe('DroitDacceeProduit Management Detail Component', () => {
        let comp: DroitDacceeProduitDetailComponent;
        let fixture: ComponentFixture<DroitDacceeProduitDetailComponent>;
        const route = ({ data: of({ droitDacceeProduit: new DroitDacceeProduit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [DroitDacceeProduitDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DroitDacceeProduitDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DroitDacceeProduitDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.droitDacceeProduit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
