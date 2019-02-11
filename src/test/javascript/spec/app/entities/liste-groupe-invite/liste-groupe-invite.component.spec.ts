/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { ListeGroupeInviteComponent } from 'app/entities/liste-groupe-invite/liste-groupe-invite.component';
import { ListeGroupeInviteService } from 'app/entities/liste-groupe-invite/liste-groupe-invite.service';
import { ListeGroupeInvite } from 'app/shared/model/liste-groupe-invite.model';

describe('Component Tests', () => {
    describe('ListeGroupeInvite Management Component', () => {
        let comp: ListeGroupeInviteComponent;
        let fixture: ComponentFixture<ListeGroupeInviteComponent>;
        let service: ListeGroupeInviteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [ListeGroupeInviteComponent],
                providers: []
            })
                .overrideTemplate(ListeGroupeInviteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ListeGroupeInviteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListeGroupeInviteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ListeGroupeInvite(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.listeGroupeInvites[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
