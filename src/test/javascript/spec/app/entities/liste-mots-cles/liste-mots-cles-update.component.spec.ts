/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { ListeMotsClesUpdateComponent } from 'app/entities/liste-mots-cles/liste-mots-cles-update.component';
import { ListeMotsClesService } from 'app/entities/liste-mots-cles/liste-mots-cles.service';
import { ListeMotsCles } from 'app/shared/model/liste-mots-cles.model';

describe('Component Tests', () => {
    describe('ListeMotsCles Management Update Component', () => {
        let comp: ListeMotsClesUpdateComponent;
        let fixture: ComponentFixture<ListeMotsClesUpdateComponent>;
        let service: ListeMotsClesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [ListeMotsClesUpdateComponent]
            })
                .overrideTemplate(ListeMotsClesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ListeMotsClesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListeMotsClesService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ListeMotsCles(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.listeMotsCles = entity;
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
                    const entity = new ListeMotsCles();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.listeMotsCles = entity;
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
