/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { FicheProduitChimiqueUpdateComponent } from 'app/entities/fiche-produit-chimique/fiche-produit-chimique-update.component';
import { FicheProduitChimiqueService } from 'app/entities/fiche-produit-chimique/fiche-produit-chimique.service';
import { FicheProduitChimique } from 'app/shared/model/fiche-produit-chimique.model';

describe('Component Tests', () => {
    describe('FicheProduitChimique Management Update Component', () => {
        let comp: FicheProduitChimiqueUpdateComponent;
        let fixture: ComponentFixture<FicheProduitChimiqueUpdateComponent>;
        let service: FicheProduitChimiqueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [FicheProduitChimiqueUpdateComponent]
            })
                .overrideTemplate(FicheProduitChimiqueUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheProduitChimiqueUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheProduitChimiqueService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FicheProduitChimique(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheProduitChimique = entity;
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
                    const entity = new FicheProduitChimique();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheProduitChimique = entity;
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
