/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheEmpruntProduitDetailComponent } from 'app/entities/fiche-emprunt-produit/fiche-emprunt-produit-detail.component';
import { FicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';

describe('Component Tests', () => {
    describe('FicheEmpruntProduit Management Detail Component', () => {
        let comp: FicheEmpruntProduitDetailComponent;
        let fixture: ComponentFixture<FicheEmpruntProduitDetailComponent>;
        const route = ({ data: of({ ficheEmpruntProduit: new FicheEmpruntProduit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheEmpruntProduitDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FicheEmpruntProduitDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheEmpruntProduitDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ficheEmpruntProduit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
