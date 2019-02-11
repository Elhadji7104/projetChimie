/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { ListeCmrDetailComponent } from 'app/entities/liste-cmr/liste-cmr-detail.component';
import { ListeCmr } from 'app/shared/model/liste-cmr.model';

describe('Component Tests', () => {
    describe('ListeCmr Management Detail Component', () => {
        let comp: ListeCmrDetailComponent;
        let fixture: ComponentFixture<ListeCmrDetailComponent>;
        const route = ({ data: of({ listeCmr: new ListeCmr(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [ListeCmrDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ListeCmrDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ListeCmrDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.listeCmr).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
