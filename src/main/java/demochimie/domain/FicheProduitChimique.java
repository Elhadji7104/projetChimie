package demochimie.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A FicheProduitChimique.
 */
@Entity
@Table(name = "fiche_produit_chimique")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FicheProduitChimique implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cas")
    private String cas;

    @Column(name = "code_produit")
    private String codeProduit;

    @Column(name = "nom")
    private String nom;

    @Column(name = "acronyme")
    private String acronyme;


    @Column(name = "formule")
    private String formule;

    @Column(name = "mm")
    private String mm;

    @Column(name = "code_nacre")
    private String codeNacre;

    @OneToMany(mappedBy = "ficheProduitChimique")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ListeCmr> listeCmrs = new HashSet<>();
    @ManyToMany(mappedBy = "ficheProduitChimiques")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<FicheArticle> ficheArticles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCas() {
        return cas;
    }

    public FicheProduitChimique cas(String cas) {
        this.cas = cas;
        return this;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    public String getCodeProduit() {
        return codeProduit;
    }

    public FicheProduitChimique codeProduit(String codeProduit) {
        this.codeProduit = codeProduit;
        return this;
    }

    public void setCodeProduit(String codeProduit) {
        this.codeProduit = codeProduit;
    }

    public String getNom() {
        return nom;
    }

    public FicheProduitChimique nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAcronyme() {
        return acronyme;
    }

    public FicheProduitChimique acronyme(String acronyme) {
        this.acronyme = acronyme;
        return this;
    }

    public void setAcronyme(String acronyme) {
        this.acronyme = acronyme;
    }
    public String getFormule() {
        return formule;
    }

    public void setFormule(String formule) {
        this.formule = formule;
    }

    public String getMm() {
        return mm;
    }

    public FicheProduitChimique mm(String mm) {
        this.mm = mm;
        return this;
    }

    public void setMm(String mm) {
        this.mm = mm;
    }

    public String getCodeNacre() {
        return codeNacre;
    }

    public FicheProduitChimique codeNacre(String codeNacre) {
        this.codeNacre = codeNacre;
        return this;
    }

    public void setCodeNacre(String codeNacre) {
        this.codeNacre = codeNacre;
    }

    public Set<ListeCmr> getListeCmrs() {
        return listeCmrs;
    }

    public FicheProduitChimique listeCmrs(Set<ListeCmr> listeCmrs) {
        this.listeCmrs = listeCmrs;
        return this;
    }

    public FicheProduitChimique addListeCmr(ListeCmr listeCmr) {
        this.listeCmrs.add(listeCmr);
        listeCmr.setFicheProduitChimique(this);
        return this;
    }

    public FicheProduitChimique removeListeCmr(ListeCmr listeCmr) {
        this.listeCmrs.remove(listeCmr);
        listeCmr.setFicheProduitChimique(null);
        return this;
    }

    public void setListeCmrs(Set<ListeCmr> listeCmrs) {
        this.listeCmrs = listeCmrs;
    }

    public Set<FicheArticle> getFicheArticles() {
        return ficheArticles;
    }

    public FicheProduitChimique ficheArticles(Set<FicheArticle> ficheArticles) {
        this.ficheArticles = ficheArticles;
        return this;
    }

    public FicheProduitChimique addFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticles.add(ficheArticle);
        ficheArticle.getFicheProduitChimiques().add(this);
        return this;
    }

    public FicheProduitChimique removeFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticles.remove(ficheArticle);
        ficheArticle.getFicheProduitChimiques().remove(this);
        return this;
    }

    public void setFicheArticles(Set<FicheArticle> ficheArticles) {
        this.ficheArticles = ficheArticles;
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
        FicheProduitChimique ficheProduitChimique = (FicheProduitChimique) o;
        if (ficheProduitChimique.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ficheProduitChimique.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FicheProduitChimique{" +
            "id=" + getId() +
            ", cas='" + getCas() + "'" +
            ", codeProduit='" + getCodeProduit() + "'" +
            ", nom='" + getNom() + "'" +
            ", acronyme='" + getAcronyme() + "'" +
            ", mm='" + getMm() + "'" +
            ", codeNacre='" + getCodeNacre() + "'" +
            ", formule='" + getFormule() + "'" +
            "}";
    }
}
