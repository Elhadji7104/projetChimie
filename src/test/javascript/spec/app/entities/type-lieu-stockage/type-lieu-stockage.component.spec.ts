/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { TypeLieuStockageComponent } from 'app/entities/type-lieu-stockage/type-lieu-stockage.component';
import { TypeLieuStockageService } from 'app/entities/type-lieu-stockage/type-lieu-stockage.service';
import { TypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';

describe('Component Tests', () => {
    describe('TypeLieuStockage Management Component', () => {
        let comp: TypeLieuStockageComponent;
        let fixture: ComponentFixture<TypeLieuStockageComponent>;
        let service: TypeLieuStockageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [TypeLieuStockageComponent],
                providers: []
            })
                .overrideTemplate(TypeLieuStockageComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypeLieuStockageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeLieuStockageService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TypeLieuStockage(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.typeLieuStockages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
