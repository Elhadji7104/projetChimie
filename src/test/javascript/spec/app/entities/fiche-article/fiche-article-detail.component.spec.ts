/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheArticleDetailComponent } from 'app/entities/fiche-article/fiche-article-detail.component';
import { FicheArticle } from 'app/shared/model/fiche-article.model';

describe('Component Tests', () => {
    describe('FicheArticle Management Detail Component', () => {
        let comp: FicheArticleDetailComponent;
        let fixture: ComponentFixture<FicheArticleDetailComponent>;
        const route = ({ data: of({ ficheArticle: new FicheArticle(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheArticleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FicheArticleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheArticleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ficheArticle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
