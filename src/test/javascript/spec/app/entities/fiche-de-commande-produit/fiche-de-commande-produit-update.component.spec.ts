/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheDeCommandeProduitUpdateComponent } from 'app/entities/fiche-de-commande-produit/fiche-de-commande-produit-update.component';
import { FicheDeCommandeProduitService } from 'app/entities/fiche-de-commande-produit/fiche-de-commande-produit.service';
import { FicheDeCommandeProduit } from 'app/shared/model/fiche-de-commande-produit.model';

describe('Component Tests', () => {
    describe('FicheDeCommandeProduit Management Update Component', () => {
        let comp: FicheDeCommandeProduitUpdateComponent;
        let fixture: ComponentFixture<FicheDeCommandeProduitUpdateComponent>;
        let service: FicheDeCommandeProduitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheDeCommandeProduitUpdateComponent]
            })
                .overrideTemplate(FicheDeCommandeProduitUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheDeCommandeProduitUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheDeCommandeProduitService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FicheDeCommandeProduit(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheDeCommandeProduit = entity;
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
                    const entity = new FicheDeCommandeProduit();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheDeCommandeProduit = entity;
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
