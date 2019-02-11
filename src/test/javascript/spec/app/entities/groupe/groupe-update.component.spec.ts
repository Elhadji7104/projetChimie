/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { GroupeUpdateComponent } from 'app/entities/groupe/groupe-update.component';
import { GroupeService } from 'app/entities/groupe/groupe.service';
import { Groupe } from 'app/shared/model/groupe.model';

describe('Component Tests', () => {
    describe('Groupe Management Update Component', () => {
        let comp: GroupeUpdateComponent;
        let fixture: ComponentFixture<GroupeUpdateComponent>;
        let service: GroupeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [GroupeUpdateComponent]
            })
                .overrideTemplate(GroupeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GroupeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Groupe(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.groupe = entity;
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
                    const entity = new Groupe();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.groupe = entity;
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
