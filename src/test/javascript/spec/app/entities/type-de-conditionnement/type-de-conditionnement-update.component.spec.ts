/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { TypeDeConditionnementUpdateComponent } from 'app/entities/type-de-conditionnement/type-de-conditionnement-update.component';
import { TypeDeConditionnementService } from 'app/entities/type-de-conditionnement/type-de-conditionnement.service';
import { TypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';

describe('Component Tests', () => {
    describe('TypeDeConditionnement Management Update Component', () => {
        let comp: TypeDeConditionnementUpdateComponent;
        let fixture: ComponentFixture<TypeDeConditionnementUpdateComponent>;
        let service: TypeDeConditionnementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [TypeDeConditionnementUpdateComponent]
            })
                .overrideTemplate(TypeDeConditionnementUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypeDeConditionnementUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeDeConditionnementService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TypeDeConditionnement(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typeDeConditionnement = entity;
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
                    const entity = new TypeDeConditionnement();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typeDeConditionnement = entity;
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
