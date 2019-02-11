/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { ListeCmrComponent } from 'app/entities/liste-cmr/liste-cmr.component';
import { ListeCmrService } from 'app/entities/liste-cmr/liste-cmr.service';
import { ListeCmr } from 'app/shared/model/liste-cmr.model';

describe('Component Tests', () => {
    describe('ListeCmr Management Component', () => {
        let comp: ListeCmrComponent;
        let fixture: ComponentFixture<ListeCmrComponent>;
        let service: ListeCmrService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [ListeCmrComponent],
                providers: []
            })
                .overrideTemplate(ListeCmrComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ListeCmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListeCmrService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ListeCmr(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.listeCmrs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
