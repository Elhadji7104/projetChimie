/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheDeCommandeProduitDetailComponent } from 'app/entities/fiche-de-commande-produit/fiche-de-commande-produit-detail.component';
import { FicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';

describe('Component Tests', () => {
    describe('FicheDeCommandeProduit Management Detail Component', () => {
        let comp: FicheDeCommandeProduitDetailComponent;
        let fixture: ComponentFixture<FicheDeCommandeProduitDetailComponent>;
        const route = ({ data: of({ ficheDeCommandeProduit: new FicheDeCommandeProduit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheDeCommandeProduitDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FicheDeCommandeProduitDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheDeCommandeProduitDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ficheDeCommandeProduit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
