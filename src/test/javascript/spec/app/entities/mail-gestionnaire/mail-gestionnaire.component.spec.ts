/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { MailGestionnaireComponent } from 'app/entities/mail-gestionnaire/mail-gestionnaire.component';
import { MailGestionnaireService } from 'app/entities/mail-gestionnaire/mail-gestionnaire.service';
import { MailGestionnaire } from 'app/shared/model/mail-gestionnaire.model';

describe('Component Tests', () => {
    describe('MailGestionnaire Management Component', () => {
        let comp: MailGestionnaireComponent;
        let fixture: ComponentFixture<MailGestionnaireComponent>;
        let service: MailGestionnaireService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [MailGestionnaireComponent],
                providers: []
            })
                .overrideTemplate(MailGestionnaireComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MailGestionnaireComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MailGestionnaireService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MailGestionnaire(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mailGestionnaires[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
