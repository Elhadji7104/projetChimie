/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { ListeCmrUpdateComponent } from 'app/entities/liste-cmr/liste-cmr-update.component';
import { ListeCmrService } from 'app/entities/liste-cmr/liste-cmr.service';
import { ListeCmr } from 'app/shared/model/liste-cmr.model';

describe('Component Tests', () => {
    describe('ListeCmr Management Update Component', () => {
        let comp: ListeCmrUpdateComponent;
        let fixture: ComponentFixture<ListeCmrUpdateComponent>;
        let service: ListeCmrService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [ListeCmrUpdateComponent]
            })
                .overrideTemplate(ListeCmrUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ListeCmrUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListeCmrService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ListeCmr(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.listeCmr = entity;
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
                    const entity = new ListeCmr();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.listeCmr = entity;
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
