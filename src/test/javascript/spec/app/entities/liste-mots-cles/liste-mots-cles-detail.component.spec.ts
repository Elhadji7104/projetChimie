/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { ListeMotsClesDetailComponent } from 'app/entities/liste-mots-cles/liste-mots-cles-detail.component';
import { ListeMotsCles } from 'app/shared/model/liste-mots-cles.model';

describe('Component Tests', () => {
    describe('ListeMotsCles Management Detail Component', () => {
        let comp: ListeMotsClesDetailComponent;
        let fixture: ComponentFixture<ListeMotsClesDetailComponent>;
        const route = ({ data: of({ listeMotsCles: new ListeMotsCles(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [ListeMotsClesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ListeMotsClesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ListeMotsClesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.listeMotsCles).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
