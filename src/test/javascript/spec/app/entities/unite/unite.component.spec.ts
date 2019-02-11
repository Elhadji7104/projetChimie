/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { UniteComponent } from 'app/entities/unite/unite.component';
import { UniteService } from 'app/entities/unite/unite.service';
import { Unite } from 'app/shared/model/unite.model';

describe('Component Tests', () => {
    describe('Unite Management Component', () => {
        let comp: UniteComponent;
        let fixture: ComponentFixture<UniteComponent>;
        let service: UniteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [UniteComponent],
                providers: []
            })
                .overrideTemplate(UniteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UniteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UniteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Unite(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.unites[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
