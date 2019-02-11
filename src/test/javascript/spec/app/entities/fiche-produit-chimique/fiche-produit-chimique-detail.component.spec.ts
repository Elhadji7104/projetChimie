/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheProduitChimiqueDetailComponent } from 'app/entities/fiche-produit-chimique/fiche-produit-chimique-detail.component';
import { FicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';

describe('Component Tests', () => {
    describe('FicheProduitChimique Management Detail Component', () => {
        let comp: FicheProduitChimiqueDetailComponent;
        let fixture: ComponentFixture<FicheProduitChimiqueDetailComponent>;
        const route = ({ data: of({ ficheProduitChimique: new FicheProduitChimique(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheProduitChimiqueDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FicheProduitChimiqueDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheProduitChimiqueDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ficheProduitChimique).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
