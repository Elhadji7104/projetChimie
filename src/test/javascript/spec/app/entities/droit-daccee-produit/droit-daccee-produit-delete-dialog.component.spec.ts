/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetChimieTestModule } from '../../../test.module';
import { DroitDacceeProduitDeleteDialogComponent } from 'app/entities/droit-daccee-produit/droit-daccee-produit-delete-dialog.component';
import { DroitDacceeProduitService } from 'app/entities/droit-daccee-produit/droit-daccee-produit.service';

describe('Component Tests', () => {
    describe('DroitDacceeProduit Management Delete Component', () => {
        let comp: DroitDacceeProduitDeleteDialogComponent;
        let fixture: ComponentFixture<DroitDacceeProduitDeleteDialogComponent>;
        let service: DroitDacceeProduitService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [DroitDacceeProduitDeleteDialogComponent]
            })
                .overrideTemplate(DroitDacceeProduitDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DroitDacceeProduitDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DroitDacceeProduitService);
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
