/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { TypeLieuStockageDetailComponent } from 'app/entities/type-lieu-stockage/type-lieu-stockage-detail.component';
import { TypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';

describe('Component Tests', () => {
    describe('TypeLieuStockage Management Detail Component', () => {
        let comp: TypeLieuStockageDetailComponent;
        let fixture: ComponentFixture<TypeLieuStockageDetailComponent>;
        const route = ({ data: of({ typeLieuStockage: new TypeLieuStockage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [TypeLieuStockageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TypeLieuStockageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypeLieuStockageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.typeLieuStockage).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
