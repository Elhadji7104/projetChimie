/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetChimieTestModule } from '../../../test.module';
import { TypeDeConditionnementDeleteDialogComponent } from 'app/entities/type-de-conditionnement/type-de-conditionnement-delete-dialog.component';
import { TypeDeConditionnementService } from 'app/entities/type-de-conditionnement/type-de-conditionnement.service';

describe('Component Tests', () => {
    describe('TypeDeConditionnement Management Delete Component', () => {
        let comp: TypeDeConditionnementDeleteDialogComponent;
        let fixture: ComponentFixture<TypeDeConditionnementDeleteDialogComponent>;
        let service: TypeDeConditionnementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [TypeDeConditionnementDeleteDialogComponent]
            })
                .overrideTemplate(TypeDeConditionnementDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypeDeConditionnementDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeDeConditionnementService);
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
