/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { ClassificationComponent } from 'app/entities/classification/classification.component';
import { ClassificationService } from 'app/entities/classification/classification.service';
import { Classification } from 'app/shared/model/classification.model';

describe('Component Tests', () => {
    describe('Classification Management Component', () => {
        let comp: ClassificationComponent;
        let fixture: ComponentFixture<ClassificationComponent>;
        let service: ClassificationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [ClassificationComponent],
                providers: []
            })
                .overrideTemplate(ClassificationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClassificationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassificationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Classification(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.classifications[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
