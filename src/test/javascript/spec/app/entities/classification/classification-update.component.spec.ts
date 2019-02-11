/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { ClassificationUpdateComponent } from 'app/entities/classification/classification-update.component';
import { ClassificationService } from 'app/entities/classification/classification.service';
import { Classification } from 'app/shared/model/classification.model';

describe('Component Tests', () => {
    describe('Classification Management Update Component', () => {
        let comp: ClassificationUpdateComponent;
        let fixture: ComponentFixture<ClassificationUpdateComponent>;
        let service: ClassificationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [ClassificationUpdateComponent]
            })
                .overrideTemplate(ClassificationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClassificationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassificationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Classification(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.classification = entity;
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
                    const entity = new Classification();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.classification = entity;
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
