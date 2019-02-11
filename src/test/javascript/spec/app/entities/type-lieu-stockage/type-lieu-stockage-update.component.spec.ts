/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { TypeLieuStockageUpdateComponent } from 'app/entities/type-lieu-stockage/type-lieu-stockage-update.component';
import { TypeLieuStockageService } from 'app/entities/type-lieu-stockage/type-lieu-stockage.service';
import { TypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';

describe('Component Tests', () => {
    describe('TypeLieuStockage Management Update Component', () => {
        let comp: TypeLieuStockageUpdateComponent;
        let fixture: ComponentFixture<TypeLieuStockageUpdateComponent>;
        let service: TypeLieuStockageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [TypeLieuStockageUpdateComponent]
            })
                .overrideTemplate(TypeLieuStockageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypeLieuStockageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeLieuStockageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TypeLieuStockage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typeLieuStockage = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TypeLieuStockage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typeLieuStockage = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
