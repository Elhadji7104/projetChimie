package demochimie.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import demochimie.domain.enumeration.DisponibliteArticle;

/**
 * A FicheArticle.
 */
@Entity
@Table(name = "fiche_article")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FicheArticle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ref_article")
    private String refArticle;

    @Column(name = "etat_physique")
    private String etatPhysique;

    @Column(name = "code_interne")
    private String codeInterne;

    @Column(name = "code_barre")
    private String codeBarre;

    @Column(name = "quantite")
    private Float quantite;


    @Enumerated(EnumType.STRING)
    @Column(name = "disponiblite_article")
    private DisponibliteArticle disponibliteArticle;

    @Column(name = "type_desuivi")
    private Boolean typeDesuivi;

    @Column(name = "accessibilite")
    private Boolean accessibilite;

    @OneToMany(mappedBy = "ficheArticle")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FicheEmpruntProduit> ficheEmpruntProduits = new HashSet<>();

    @OneToMany(mappedBy = "ficheArticle")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FicheRetourProduit> ficheRetourProduits = new HashSet<>();

    //ajout d'un set de lieu de stockage
    @ManyToOne
    @JsonIgnoreProperties("ficheArticles")
    private TypeLieuStockage typeLieuStockage;
    @OneToMany(mappedBy = "ficheArticle")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FicheDeCommandeProduit> ficheDeCommandeProduits = new HashSet<>();
    @OneToMany(mappedBy = "ficheArticle")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ListeMotsCles> listeMotsCles = new HashSet<>();
    @OneToMany(mappedBy = "ficheArticle")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TypeDeConditionnement> typeDeConditionnements = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "fiche_article_document",
               joinColumns = @JoinColumn(name = "fiche_articles_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "documents_id", referencedColumnName = "id"))
    private Set<Document> documents = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "fiche_article_unite",
               joinColumns = @JoinColumn(name = "fiche_articles_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "unites_id", referencedColumnName = "id"))
    private Set<Unite> unites = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "fiche_article_fiche_produit_chimique",
               joinColumns = @JoinColumn(name = "fiche_articles_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "fiche_produit_chimiques_id", referencedColumnName = "id"))
    private Set<FicheProduitChimique> ficheProduitChimiques = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "fiche_article_classification",
               joinColumns = @JoinColumn(name = "fiche_articles_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "classifications_id", referencedColumnName = "id"))
    private Set<Classification> classifications = new HashSet<>();

    @OneToMany(mappedBy = "ficheArticle")
    private Set<DroitDacceeProduit> droitDacceeProduits;
    @ManyToOne
    @JsonIgnoreProperties("ficheArticles")
    private Groupe groupe;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRefArticle() {
        return refArticle;
    }

    public FicheArticle refArticle(String refArticle) {
        this.refArticle = refArticle;
        return this;
    }

    public void setRefArticle(String refArticle) {
        this.refArticle = refArticle;
    }

    public String getEtatPhysique() {
        return etatPhysique;
    }

    public FicheArticle etatPhysique(String etatPhysique) {
        this.etatPhysique = etatPhysique;
        return this;
    }
    //lieu de stockage

    public TypeLieuStockage getTypeLieuStockage() {
        return typeLieuStockage;
    }

    public void setTypeLieuStockage(TypeLieuStockage typeLieuStockage) {
        this.typeLieuStockage = typeLieuStockage;
    }

    public Groupe getGroupe() {
        return groupe;
    }


    public Set<DroitDacceeProduit> getDroitDacceeProduits() {
        return droitDacceeProduits;
    }

    public void setDroitDacceeProduits(Set<DroitDacceeProduit> droitDacceeProduits) {
        this.droitDacceeProduits = droitDacceeProduits;
    }

    public void setGroupe(Groupe groupe) {
        this.groupe = groupe;
    }
    public void setEtatPhysique(String etatPhysique) {
        this.etatPhysique = etatPhysique;
    }

    public String getCodeInterne() {
        return codeInterne;
    }

    public FicheArticle codeInterne(String codeInterne) {
        this.codeInterne = codeInterne;
        return this;
    }
    public Float getQuantite() {
        return quantite;
    }

    public void setQuantite(Float quantite) {
        this.quantite = quantite;
    }
    public void setCodeInterne(String codeInterne) {
        this.codeInterne = codeInterne;
    }

    public String getCodeBarre() {
        return codeBarre;
    }

    public FicheArticle codeBarre(String codeBarre) {
        this.codeBarre = codeBarre;
        return this;
    }

    public void setCodeBarre(String codeBarre) {
        this.codeBarre = codeBarre;
    }

    public DisponibliteArticle getDisponibliteArticle() {
        return disponibliteArticle;
    }

    public FicheArticle disponibliteArticle(DisponibliteArticle disponibliteArticle) {
        this.disponibliteArticle = disponibliteArticle;
        return this;
    }

    public void setDisponibliteArticle(DisponibliteArticle disponibliteArticle) {
        this.disponibliteArticle = disponibliteArticle;
    }

    public Boolean isTypeDesuivi() {
        return typeDesuivi;
    }

    public FicheArticle typeDesuivi(Boolean typeDesuivi) {
        this.typeDesuivi = typeDesuivi;
        return this;
    }

    public void setTypeDesuivi(Boolean typeDesuivi) {
        this.typeDesuivi = typeDesuivi;
    }

    public Boolean isAccessibilite() {
        return accessibilite;
    }

    public FicheArticle accessibilite(Boolean accessibilite) {
        this.accessibilite = accessibilite;
        return this;
    }

    public void setAccessibilite(Boolean accessibilite) {
        this.accessibilite = accessibilite;
    }

    public Set<FicheEmpruntProduit> getFicheEmpruntProduits() {
        return ficheEmpruntProduits;
    }

    public FicheArticle ficheEmpruntProduits(Set<FicheEmpruntProduit> ficheEmpruntProduits) {
        this.ficheEmpruntProduits = ficheEmpruntProduits;
        return this;
    }
    public FicheArticle addFicheEmpruntProduit(FicheEmpruntProduit ficheEmpruntProduit) {
        this.ficheEmpruntProduits.add(ficheEmpruntProduit);
        ficheEmpruntProduit.setFicheArticle(this);
        return this;
    }

    public FicheArticle removeFicheEmpruntProduit(FicheEmpruntProduit ficheEmpruntProduit) {
        this.ficheEmpruntProduits.remove(ficheEmpruntProduit);
        ficheEmpruntProduit.setFicheArticle(null);
        return this;
    }

    public void setFicheEmpruntProduits(Set<FicheEmpruntProduit> ficheEmpruntProduits) {
        this.ficheEmpruntProduits = ficheEmpruntProduits;
    }

    public Set<FicheRetourProduit> getFicheRetourProduits() {
        return ficheRetourProduits;
    }

    public FicheArticle ficheRetourProduits(Set<FicheRetourProduit> ficheRetourProduits) {
        this.ficheRetourProduits = ficheRetourProduits;
        return this;
    }

    public FicheArticle addFicheRetourProduit(FicheRetourProduit ficheRetourProduit) {
        this.ficheRetourProduits.add(ficheRetourProduit);
        ficheRetourProduit.setFicheArticle(this);
        return this;
    }

    public FicheArticle removeFicheRetourProduit(FicheRetourProduit ficheRetourProduit) {
        this.ficheRetourProduits.remove(ficheRetourProduit);
        ficheRetourProduit.setFicheArticle(null);
        return this;
    }

    public void setFicheRetourProduits(Set<FicheRetourProduit> ficheRetourProduits) {
        this.ficheRetourProduits = ficheRetourProduits;
    }

    public Set<FicheDeCommandeProduit> getFicheDeCommandeProduits() {
        return ficheDeCommandeProduits;
    }

    public FicheArticle ficheDeCommandeProduits(Set<FicheDeCommandeProduit> ficheDeCommandeProduits) {
        this.ficheDeCommandeProduits = ficheDeCommandeProduits;
        return this;
    }

    public FicheArticle addFicheDeCommandeProduit(FicheDeCommandeProduit ficheDeCommandeProduit) {
        this.ficheDeCommandeProduits.add(ficheDeCommandeProduit);
        ficheDeCommandeProduit.setFicheArticle(this);
        return this;
    }

    public FicheArticle removeFicheDeCommandeProduit(FicheDeCommandeProduit ficheDeCommandeProduit) {
        this.ficheDeCommandeProduits.remove(ficheDeCommandeProduit);
        ficheDeCommandeProduit.setFicheArticle(null);
        return this;
    }

    public void setFicheDeCommandeProduits(Set<FicheDeCommandeProduit> ficheDeCommandeProduits) {
        this.ficheDeCommandeProduits = ficheDeCommandeProduits;
    }

    public Set<ListeMotsCles> getListeMotsCles() {
        return listeMotsCles;
    }

    public FicheArticle listeMotsCles(Set<ListeMotsCles> listeMotsCles) {
        this.listeMotsCles = listeMotsCles;
        return this;
    }

    public FicheArticle addListeMotsCles(ListeMotsCles listeMotsCles) {
        this.listeMotsCles.add(listeMotsCles);
        listeMotsCles.setFicheArticle(this);
        return this;
    }

    public FicheArticle removeListeMotsCles(ListeMotsCles listeMotsCles) {
        this.listeMotsCles.remove(listeMotsCles);
        listeMotsCles.setFicheArticle(null);
        return this;
    }

    public void setListeMotsCles(Set<ListeMotsCles> listeMotsCles) {
        this.listeMotsCles = listeMotsCles;
    }

    public Set<TypeDeConditionnement> getTypeDeConditionnements() {
        return typeDeConditionnements;
    }

    public FicheArticle typeDeConditionnements(Set<TypeDeConditionnement> typeDeConditionnements) {
        this.typeDeConditionnements = typeDeConditionnements;
        return this;
    }

    public FicheArticle addTypeDeConditionnement(TypeDeConditionnement typeDeConditionnement) {
        this.typeDeConditionnements.add(typeDeConditionnement);
        typeDeConditionnement.setFicheArticle(this);
        return this;
    }

    public FicheArticle removeTypeDeConditionnement(TypeDeConditionnement typeDeConditionnement) {
        this.typeDeConditionnements.remove(typeDeConditionnement);
        typeDeConditionnement.setFicheArticle(null);
        return this;
    }

    public void setTypeDeConditionnements(Set<TypeDeConditionnement> typeDeConditionnements) {
        this.typeDeConditionnements = typeDeConditionnements;
    }
    /**
    public Set<Localisation> getLocalisations() {
        return localisations;
    }

    public FicheArticle localisations(Set<Localisation> localisations) {
        this.localisations = localisations;
        return this;
    }

    public FicheArticle addLocalisation(Localisation localisation) {
        this.localisations.add(localisation);
        localisation.setFicheArticle(this);
        return this;
    }

    public FicheArticle removeLocalisation(Localisation localisation) {
        this.localisations.remove(localisation);
        localisation.setFicheArticle(null);
        return this;
    }

    public void setLocalisations(Set<Localisation> localisations) {
        this.localisations = localisations;
    }
    **/
    public Set<Document> getDocuments() {
        return documents;
    }

    public FicheArticle documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public FicheArticle addDocument(Document document) {
        this.documents.add(document);
        document.getFicheArticles().add(this);
        return this;
    }

    public FicheArticle removeDocument(Document document) {
        this.documents.remove(document);
        document.getFicheArticles().remove(this);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Set<Unite> getUnites() {
        return unites;
    }

    public FicheArticle unites(Set<Unite> unites) {
        this.unites = unites;
        return this;
    }

    public FicheArticle addUnite(Unite unite) {
        this.unites.add(unite);
        unite.getFicheArticles().add(this);
        return this;
    }

    public FicheArticle removeUnite(Unite unite) {
        this.unites.remove(unite);
        unite.getFicheArticles().remove(this);
        return this;
    }

    public void setUnites(Set<Unite> unites) {
        this.unites = unites;
    }

    public Set<FicheProduitChimique> getFicheProduitChimiques() {
        return ficheProduitChimiques;
    }

    public FicheArticle ficheProduitChimiques(Set<FicheProduitChimique> ficheProduitChimiques) {
        this.ficheProduitChimiques = ficheProduitChimiques;
        return this;
    }

    public FicheArticle addFicheProduitChimique(FicheProduitChimique ficheProduitChimique) {
        this.ficheProduitChimiques.add(ficheProduitChimique);
        ficheProduitChimique.getFicheArticles().add(this);
        return this;
    }

    public FicheArticle removeFicheProduitChimique(FicheProduitChimique ficheProduitChimique) {
        this.ficheProduitChimiques.remove(ficheProduitChimique);
        ficheProduitChimique.getFicheArticles().remove(this);
        return this;
    }

    public void setFicheProduitChimiques(Set<FicheProduitChimique> ficheProduitChimiques) {
        this.ficheProduitChimiques = ficheProduitChimiques;
    }

    public Set<Classification> getClassifications() {
        return classifications;
    }

    public FicheArticle classifications(Set<Classification> classifications) {
        this.classifications = classifications;
        return this;
    }

    public FicheArticle addClassification(Classification classification) {
        this.classifications.add(classification);
        classification.getFicheArticles().add(this);
        return this;
    }

    public FicheArticle removeClassification(Classification classification) {
        this.classifications.remove(classification);
        classification.getFicheArticles().remove(this);
        return this;
    }

    public void setClassifications(Set<Classification> classifications) {
        this.classifications = classifications;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        FicheArticle ficheArticle = (FicheArticle) o;
        if (ficheArticle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ficheArticle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FicheArticle{" +
            "id=" + getId() +
            ", refArticle='" + getRefArticle() + "'" +
            ", etatPhysique='" + getEtatPhysique() + "'" +
            ", codeInterne='" + getCodeInterne() + "'" +
            ", codeBarre='" + getCodeBarre() + "'" +
            ", quantite='" + getQuantite() + "'" +
            ", disponibliteArticle='" + getDisponibliteArticle() + "'" +
            ", typeDesuivi='" + isTypeDesuivi() + "'" +
            ", accessibilite='" + isAccessibilite() + "'" +
            "}";
    }
}
