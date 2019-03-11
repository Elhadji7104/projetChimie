import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProjetChimieGroupeModule } from './groupe/groupe.module';
import { ProjetChimieDroitDacceeProduitModule } from './droit-daccee-produit/droit-daccee-produit.module';
import { ProjetChimieMailGestionnaireModule } from './mail-gestionnaire/mail-gestionnaire.module';
import { ProjetChimieFicheArticleModule } from './fiche-article/fiche-article.module';
import { ProjetChimieFicheProduitChimiqueModule } from './fiche-produit-chimique/fiche-produit-chimique.module';
import { ProjetChimieListeMotsClesModule } from './liste-mots-cles/liste-mots-cles.module';
import { ProjetChimieFicheDeCommandeProduitModule } from './fiche-de-commande-produit/fiche-de-commande-produit.module';
import { ProjetChimieFicheEmpruntProduitModule } from './fiche-emprunt-produit/fiche-emprunt-produit.module';
import { ProjetChimieFicheRetourProduitModule } from './fiche-retour-produit/fiche-retour-produit.module';
import { ProjetChimieFournisseurModule } from './fournisseur/fournisseur.module';
import { ProjetChimieTypeDeConditionnementModule } from './type-de-conditionnement/type-de-conditionnement.module';
import { ProjetChimieDocumentModule } from './document/document.module';
import { ProjetChimieLocalisationModule } from './localisation/localisation.module';
import { ProjetChimieUniteModule } from './unite/unite.module';
import { ProjetChimieListeCmrModule } from './liste-cmr/liste-cmr.module';
import { ProjetChimieTypeLieuStockageModule } from './type-lieu-stockage/type-lieu-stockage.module';
import { ProjetChimieClassificationModule } from './classification/classification.module';
import { ProjetChimieListeGroupeInviteModule } from './liste-groupe-invite/liste-groupe-invite.module';
import { ProjetListeLocalisationModule } from './liste-localisation/liste-localisation.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ProjetChimieGroupeModule,
        ProjetChimieDroitDacceeProduitModule,
        ProjetChimieMailGestionnaireModule,
        ProjetChimieFicheArticleModule,
        ProjetChimieFicheProduitChimiqueModule,
        ProjetChimieListeMotsClesModule,
        ProjetChimieFicheDeCommandeProduitModule,
        ProjetChimieFicheEmpruntProduitModule,
        ProjetChimieFicheRetourProduitModule,
        ProjetChimieFournisseurModule,
        ProjetChimieTypeDeConditionnementModule,
        ProjetChimieDocumentModule,
        ProjetChimieLocalisationModule,
        ProjetChimieUniteModule,
        ProjetChimieListeCmrModule,
        ProjetChimieTypeLieuStockageModule,
        ProjetChimieClassificationModule,
        ProjetChimieListeGroupeInviteModule,
        ProjetListeLocalisationModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetChimieEntityModule {}
