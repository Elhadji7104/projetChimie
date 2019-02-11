/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheRetourProduitDetailComponent } from 'app/entities/fiche-retour-produit/fiche-retour-produit-detail.component';
import { FicheRetourProduit } from 'app/shared/model/fiche-retour-produit.model';

describe('Component Tests', () => {
    describe('FicheRetourProduit Management Detail Component', () => {
        let comp: FicheRetourProduitDetailComponent;
        let fixture: ComponentFixture<FicheRetourProduitDetailComponent>;
        const route = ({ data: of({ ficheRetourProduit: new FicheRetourProduit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheRetourProduitDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FicheRetourProduitDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheRetourProduitDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ficheRetourProduit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
