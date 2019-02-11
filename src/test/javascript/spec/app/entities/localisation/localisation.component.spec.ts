/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { LocalisationComponent } from 'app/entities/localisation/localisation.component';
import { LocalisationService } from 'app/entities/localisation/localisation.service';
import { Localisation } from 'app/shared/model/localisation.model';

describe('Component Tests', () => {
    describe('Localisation Management Component', () => {
        let comp: LocalisationComponent;
        let fixture: ComponentFixture<LocalisationComponent>;
        let service: LocalisationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [LocalisationComponent],
                providers: []
            })
                .overrideTemplate(LocalisationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocalisationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocalisationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Localisation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.localisations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
