/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheProduitChimiqueDeleteDialogComponent } from 'app/entities/fiche-produit-chimique/fiche-produit-chimique-delete-dialog.component';
import { FicheProduitChimiqueService } from 'app/entities/fiche-produit-chimique/fiche-produit-chimique.service';

describe('Component Tests', () => {
    describe('FicheProduitChimique Management Delete Component', () => {
        let comp: FicheProduitChimiqueDeleteDialogComponent;
        let fixture: ComponentFixture<FicheProduitChimiqueDeleteDialogComponent>;
        let service: FicheProduitChimiqueService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheProduitChimiqueDeleteDialogComponent]
            })
                .overrideTemplate(FicheProduitChimiqueDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheProduitChimiqueDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheProduitChimiqueService);
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
