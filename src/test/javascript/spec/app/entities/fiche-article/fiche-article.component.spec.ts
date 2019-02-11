/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheArticleComponent } from 'app/entities/fiche-article/fiche-article.component';
import { FicheArticleService } from 'app/entities/fiche-article/fiche-article.service';
import { FicheArticle } from 'app/shared/model/fiche-article.model';

describe('Component Tests', () => {
    describe('FicheArticle Management Component', () => {
        let comp: FicheArticleComponent;
        let fixture: ComponentFixture<FicheArticleComponent>;
        let service: FicheArticleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheArticleComponent],
                providers: []
            })
                .overrideTemplate(FicheArticleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheArticleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheArticleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FicheArticle(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ficheArticles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
