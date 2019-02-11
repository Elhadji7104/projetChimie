/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { TypeDeConditionnementComponent } from 'app/entities/type-de-conditionnement/type-de-conditionnement.component';
import { TypeDeConditionnementService } from 'app/entities/type-de-conditionnement/type-de-conditionnement.service';
import { TypeDeConditionnement } from 'app/shared/model/type-de-conditionnement.model';

describe('Component Tests', () => {
    describe('TypeDeConditionnement Management Component', () => {
        let comp: TypeDeConditionnementComponent;
        let fixture: ComponentFixture<TypeDeConditionnementComponent>;
        let service: TypeDeConditionnementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [TypeDeConditionnementComponent],
                providers: []
            })
                .overrideTemplate(TypeDeConditionnementComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypeDeConditionnementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeDeConditionnementService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TypeDeConditionnement(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.typeDeConditionnements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
