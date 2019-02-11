/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheEmpruntProduitUpdateComponent } from 'app/entities/fiche-emprunt-produit/fiche-emprunt-produit-update.component';
import { FicheEmpruntProduitService } from 'app/entities/fiche-emprunt-produit/fiche-emprunt-produit.service';
import { FicheEmpruntProduit } from 'app/shared/model/fiche-emprunt-produit.model';

describe('Component Tests', () => {
    describe('FicheEmpruntProduit Management Update Component', () => {
        let comp: FicheEmpruntProduitUpdateComponent;
        let fixture: ComponentFixture<FicheEmpruntProduitUpdateComponent>;
        let service: FicheEmpruntProduitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheEmpruntProduitUpdateComponent]
            })
                .overrideTemplate(FicheEmpruntProduitUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheEmpruntProduitUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheEmpruntProduitService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FicheEmpruntProduit(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheEmpruntProduit = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FicheEmpruntProduit();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheEmpruntProduit = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
