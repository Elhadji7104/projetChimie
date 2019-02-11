/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { MailGestionnaireDetailComponent } from 'app/entities/mail-gestionnaire/mail-gestionnaire-detail.component';
import { MailGestionnaire } from 'app/shared/model/mail-gestionnaire.model';

describe('Component Tests', () => {
    describe('MailGestionnaire Management Detail Component', () => {
        let comp: MailGestionnaireDetailComponent;
        let fixture: ComponentFixture<MailGestionnaireDetailComponent>;
        const route = ({ data: of({ mailGestionnaire: new MailGestionnaire(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [MailGestionnaireDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MailGestionnaireDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MailGestionnaireDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mailGestionnaire).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
