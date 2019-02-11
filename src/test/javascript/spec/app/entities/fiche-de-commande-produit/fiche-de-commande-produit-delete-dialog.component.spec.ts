/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheDeCommandeProduitDeleteDialogComponent } from 'app/entities/fiche-de-commande-produit/fiche-de-commande-produit-delete-dialog.component';
import { FicheDeCommandeProduitService } from 'app/entities/fiche-de-commande-produit/fiche-de-commande-produit.service';

describe('Component Tests', () => {
    describe('FicheDeCommandeProduit Management Delete Component', () => {
        let comp: FicheDeCommandeProduitDeleteDialogComponent;
        let fixture: ComponentFixture<FicheDeCommandeProduitDeleteDialogComponent>;
        let service: FicheDeCommandeProduitService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheDeCommandeProduitDeleteDialogComponent]
            })
                .overrideTemplate(FicheDeCommandeProduitDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheDeCommandeProduitDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheDeCommandeProduitService);
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
