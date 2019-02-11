/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheArticleDeleteDialogComponent } from 'app/entities/fiche-article/fiche-article-delete-dialog.component';
import { FicheArticleService } from 'app/entities/fiche-article/fiche-article.service';

describe('Component Tests', () => {
    describe('FicheArticle Management Delete Component', () => {
        let comp: FicheArticleDeleteDialogComponent;
        let fixture: ComponentFixture<FicheArticleDeleteDialogComponent>;
        let service: FicheArticleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheArticleDeleteDialogComponent]
            })
                .overrideTemplate(FicheArticleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheArticleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheArticleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
