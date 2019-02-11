/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetChimieTestModule } from '../../../test.module';
import { TypeLieuStockageDeleteDialogComponent } from 'app/entities/type-lieu-stockage/type-lieu-stockage-delete-dialog.component';
import { TypeLieuStockageService } from 'app/entities/type-lieu-stockage/type-lieu-stockage.service';

describe('Component Tests', () => {
    describe('TypeLieuStockage Management Delete Component', () => {
        let comp: TypeLieuStockageDeleteDialogComponent;
        let fixture: ComponentFixture<TypeLieuStockageDeleteDialogComponent>;
        let service: TypeLieuStockageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [TypeLieuStockageDeleteDialogComponent]
            })
                .overrideTemplate(TypeLieuStockageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypeLieuStockageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeLieuStockageService);
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
