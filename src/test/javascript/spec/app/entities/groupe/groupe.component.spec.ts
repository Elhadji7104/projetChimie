/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { GroupeComponent } from 'app/entities/groupe/groupe.component';
import { GroupeService } from 'app/entities/groupe/groupe.service';
import { Groupe } from 'app/shared/model/groupe.model';

describe('Component Tests', () => {
    describe('Groupe Management Component', () => {
        let comp: GroupeComponent;
        let fixture: ComponentFixture<GroupeComponent>;
        let service: GroupeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [GroupeComponent],
                providers: []
            })
                .overrideTemplate(GroupeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GroupeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Groupe(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.groupes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
