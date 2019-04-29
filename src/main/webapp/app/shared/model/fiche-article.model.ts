import { IFicheEmpruntProduit } from 'app/shared/model//fiche-emprunt-produit.model';
import { IFicheRetourProduit } from 'app/shared/model//fiche-retour-produit.model';
import { IFicheDeCommandeProduit } from 'app/shared/model//fiche-de-commande-produit.model';
import { IListeMotsCles } from 'app/shared/model//liste-mots-cles.model';
import { ITypeDeConditionnement } from 'app/shared/model//type-de-conditionnement.model';
import { ILocalisation } from 'app/shared/model//localisation.model';
import { IDocument } from 'app/shared/model//document.model';
import { IUnite } from 'app/shared/model//unite.model';
import { IFicheProduitChimique } from 'app/shared/model//fiche-produit-chimique.model';
import { IClassification } from 'app/shared/model//classification.model';
import { IDroitDacceeProduit } from 'app/shared/model//droit-daccee-produit.model';
import { ITypeLieuStockage } from 'app/shared/model/type-lieu-stockage.model';
import { IGroupe } from 'app/shared/model/groupe.model';

export const enum DisponibliteArticle {
    DISPONIBLE = 'DISPONIBLE',
    INDISPONIBLE = 'INDISPONIBLE',
    FINDESTOCK = 'FINDESTOCK',
    ENCOMMANDE = 'ENCOMMANDE'
}

export interface IFicheArticle {
    id?: number;
    refArticle?: string;
    etatPhysique?: string;
    codeInterne?: string;
    codeBarre?: string;
    quantite?: number;
    disponibliteArticle?: DisponibliteArticle;
    typeDesuivi?: boolean;
    accessibilite?: boolean;
    ficheEmpruntProduits?: IFicheEmpruntProduit[];
    ficheRetourProduits?: IFicheRetourProduit[];
    ficheDeCommandeProduits?: IFicheDeCommandeProduit[];
    listeMotsCles?: IListeMotsCles[];
    typeDeConditionnements?: ITypeDeConditionnement[];
    localisations?: ILocalisation[];
    documents?: IDocument[];
    unites?: IUnite[];
    ficheProduitChimiques?: IFicheProduitChimique[];
    classifications?: IClassification[];
    droitDacceeProduit?: IDroitDacceeProduit;
    typeLieuStockage?: ITypeLieuStockage;
    groupe?: IGroupe;
}

export class FicheArticle implements IFicheArticle {
    constructor(
        public id?: number,
        public refArticle?: string,
        public etatPhysique?: string,
        public codeInterne?: string,
        public codeBarre?: string,
        public quantite?: number,
        public disponibliteArticle?: DisponibliteArticle,
        public typeDesuivi?: boolean,
        public accessibilite?: boolean,
        public ficheDeCommandeProduits?: IFicheDeCommandeProduit[],
        public listeMotsCles?: IListeMotsCles[],
        public typeDeConditionnements?: ITypeDeConditionnement[],
        public localisations?: ILocalisation[],
        public documents?: IDocument[],
        public unites?: IUnite[],
        public ficheProduitChimiques?: IFicheProduitChimique[],
        public classifications?: IClassification[],
        public droitDacceeProduit?: IDroitDacceeProduit,
        public groupe?: IGroupe,
        public typeLieuStockage?: ITypeLieuStockage
    ) {
        this.typeDesuivi = this.typeDesuivi || false;
        this.accessibilite = this.accessibilite || false;
    }
}
