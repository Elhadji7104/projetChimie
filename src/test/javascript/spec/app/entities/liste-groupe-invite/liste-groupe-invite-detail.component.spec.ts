/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { ListeGroupeInviteDetailComponent } from 'app/entities/liste-groupe-invite/liste-groupe-invite-detail.component';
import { ListeGroupeInvite } from 'app/shared/model/liste-groupe-invite.model';

describe('Component Tests', () => {
    describe('ListeGroupeInvite Management Detail Component', () => {
        let comp: ListeGroupeInviteDetailComponent;
        let fixture: ComponentFixture<ListeGroupeInviteDetailComponent>;
        const route = ({ data: of({ listeGroupeInvite: new ListeGroupeInvite(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [ListeGroupeInviteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ListeGroupeInviteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ListeGroupeInviteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.listeGroupeInvite).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
