import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConserveRechercheService {
    codeBarre: any[] = [];
    disponibliteArticle: any[] = [];
    nom: any[] = [];
    classification: any[] = [];
    cas: any[] = [];
    acronyme: any[] = [];
    formule: any[] = [];
    conserveFiltre(
        codeBarre: any[],
        classification: any[],
        disponibliteArticle: any[],
        cas: any[],
        nom: any[],
        acronyme: any[],
        formule: any[]
    ) {
        this.codeBarre = codeBarre;
        this.classification = classification;
        this.disponibliteArticle = disponibliteArticle;
        this.cas = cas;
        this.nom = nom;
        this.acronyme = acronyme;
        this.formule = formule;
    }

    getCodeBarre() {
        return this.codeBarre;
    }
    getDisponibliteArticle() {
        return this.disponibliteArticle;
    }
    getNom() {
        return this.nom;
    }

    getClassification() {
        return this.classification;
    }
    getCas() {
        return this.cas;
    }
    getAcronyme() {
        return this.acronyme;
    }
    getFormule() {
        return this.formule;
    }

    constructor() {}
}
