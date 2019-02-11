/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheEmpruntProduitDeleteDialogComponent } from 'app/entities/fiche-emprunt-produit/fiche-emprunt-produit-delete-dialog.component';
import { FicheEmpruntProduitService } from 'app/entities/fiche-emprunt-produit/fiche-emprunt-produit.service';

describe('Component Tests', () => {
    describe('FicheEmpruntProduit Management Delete Component', () => {
        let comp: FicheEmpruntProduitDeleteDialogComponent;
        let fixture: ComponentFixture<FicheEmpruntProduitDeleteDialogComponent>;
        let service: FicheEmpruntProduitService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheEmpruntProduitDeleteDialogComponent]
            })
                .overrideTemplate(FicheEmpruntProduitDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheEmpruntProduitDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheEmpruntProduitService);
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
