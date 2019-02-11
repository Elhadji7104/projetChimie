/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { ListeMotsClesComponent } from 'app/entities/liste-mots-cles/liste-mots-cles.component';
import { ListeMotsClesService } from 'app/entities/liste-mots-cles/liste-mots-cles.service';
import { ListeMotsCles } from 'app/shared/model/liste-mots-cles.model';

describe('Component Tests', () => {
    describe('ListeMotsCles Management Component', () => {
        let comp: ListeMotsClesComponent;
        let fixture: ComponentFixture<ListeMotsClesComponent>;
        let service: ListeMotsClesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [ListeMotsClesComponent],
                providers: []
            })
                .overrideTemplate(ListeMotsClesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ListeMotsClesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListeMotsClesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ListeMotsCles(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.listeMotsCles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
