/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { GroupeDetailComponent } from 'app/entities/groupe/groupe-detail.component';
import { Groupe } from 'app/shared/model/groupe.model';

describe('Component Tests', () => {
    describe('Groupe Management Detail Component', () => {
        let comp: GroupeDetailComponent;
        let fixture: ComponentFixture<GroupeDetailComponent>;
        const route = ({ data: of({ groupe: new Groupe(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [GroupeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GroupeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GroupeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.groupe).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
