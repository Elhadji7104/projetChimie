/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheRetourProduitUpdateComponent } from 'app/entities/fiche-retour-produit/fiche-retour-produit-update.component';
import { FicheRetourProduitService } from 'app/entities/fiche-retour-produit/fiche-retour-produit.service';
import { FicheRetourProduit } from 'app/shared/model/fiche-retour-produit.model';

describe('Component Tests', () => {
    describe('FicheRetourProduit Management Update Component', () => {
        let comp: FicheRetourProduitUpdateComponent;
        let fixture: ComponentFixture<FicheRetourProduitUpdateComponent>;
        let service: FicheRetourProduitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheRetourProduitUpdateComponent]
            })
                .overrideTemplate(FicheRetourProduitUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheRetourProduitUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheRetourProduitService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FicheRetourProduit(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheRetourProduit = entity;
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
                    const entity = new FicheRetourProduit();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheRetourProduit = entity;
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
