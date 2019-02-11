/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetChimieTestModule } from '../../../test.module';
import { DroitDacceeProduitUpdateComponent } from 'app/entities/droit-daccee-produit/droit-daccee-produit-update.component';
import { DroitDacceeProduitService } from 'app/entities/droit-daccee-produit/droit-daccee-produit.service';
import { DroitDacceeProduit } from 'app/shared/model/droit-daccee-produit.model';

describe('Component Tests', () => {
    describe('DroitDacceeProduit Management Update Component', () => {
        let comp: DroitDacceeProduitUpdateComponent;
        let fixture: ComponentFixture<DroitDacceeProduitUpdateComponent>;
        let service: DroitDacceeProduitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetChimieTestModule],
                declarations: [DroitDacceeProduitUpdateComponent]
            })
                .overrideTemplate(DroitDacceeProduitUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DroitDacceeProduitUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DroitDacceeProduitService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DroitDacceeProduit(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.droitDacceeProduit = entity;
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
                    const entity = new DroitDacceeProduit();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.droitDacceeProduit = entity;
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
