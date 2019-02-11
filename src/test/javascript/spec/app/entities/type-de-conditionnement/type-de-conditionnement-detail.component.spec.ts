/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { TypeDeConditionnementDetailComponent } from 'app/entities/type-de-conditionnement/type-de-conditionnement-detail.component';
import { TypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';

describe('Component Tests', () => {
    describe('TypeDeConditionnement Management Detail Component', () => {
        let comp: TypeDeConditionnementDetailComponent;
        let fixture: ComponentFixture<TypeDeConditionnementDetailComponent>;
        const route = ({ data: of({ typeDeConditionnement: new TypeDeConditionnement(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [TypeDeConditionnementDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TypeDeConditionnementDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypeDeConditionnementDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.typeDeConditionnement).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
