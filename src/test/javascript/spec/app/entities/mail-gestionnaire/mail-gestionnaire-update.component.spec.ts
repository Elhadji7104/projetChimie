/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { MailGestionnaireUpdateComponent } from 'app/entities/mail-gestionnaire/mail-gestionnaire-update.component';
import { MailGestionnaireService } from 'app/entities/mail-gestionnaire/mail-gestionnaire.service';
import { MailGestionnaire } from 'app/shared/model/mail-gestionnaire.model';

describe('Component Tests', () => {
    describe('MailGestionnaire Management Update Component', () => {
        let comp: MailGestionnaireUpdateComponent;
        let fixture: ComponentFixture<MailGestionnaireUpdateComponent>;
        let service: MailGestionnaireService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [MailGestionnaireUpdateComponent]
            })
                .overrideTemplate(MailGestionnaireUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MailGestionnaireUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MailGestionnaireService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MailGestionnaire(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mailGestionnaire = entity;
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
                    const entity = new MailGestionnaire();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mailGestionnaire = entity;
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
