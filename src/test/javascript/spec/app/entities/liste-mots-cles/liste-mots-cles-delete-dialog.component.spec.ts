/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetChimieTestModule } from '../../../test.module';
import { ListeMotsClesDeleteDialogComponent } from 'app/entities/liste-mots-cles/liste-mots-cles-delete-dialog.component';
import { ListeMotsClesService } from 'app/entities/liste-mots-cles/liste-mots-cles.service';

describe('Component Tests', () => {
    describe('ListeMotsCles Management Delete Component', () => {
        let comp: ListeMotsClesDeleteDialogComponent;
        let fixture: ComponentFixture<ListeMotsClesDeleteDialogComponent>;
        let service: ListeMotsClesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [ListeMotsClesDeleteDialogComponent]
            })
                .overrideTemplate(ListeMotsClesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ListeMotsClesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListeMotsClesService);
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
