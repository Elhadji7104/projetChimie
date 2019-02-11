/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { UniteUpdateComponent } from 'app/entities/unite/unite-update.component';
import { UniteService } from 'app/entities/unite/unite.service';
import { Unite } from 'app/shared/model/unite.model';

describe('Component Tests', () => {
    describe('Unite Management Update Component', () => {
        let comp: UniteUpdateComponent;
        let fixture: ComponentFixture<UniteUpdateComponent>;
        let service: UniteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [UniteUpdateComponent]
            })
                .overrideTemplate(UniteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UniteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UniteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Unite(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.unite = entity;
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
                    const entity = new Unite();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.unite = entity;
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
