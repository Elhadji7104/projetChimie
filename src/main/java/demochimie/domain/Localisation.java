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

/**
 * A Localisation.
 */
@Entity
@Table(name = "localisation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Localisation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "code_postal")
    private String codePostal;

    @Column(name = "ville")
    private String ville;

    @Column(name = "pays")
    private String pays;

    @Column(name = "quantite")
    private Float quantite;

    @ManyToOne
    @JsonIgnoreProperties("classifications")
    private Groupe groupe;


    @OneToMany(mappedBy = "localisation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TypeLieuStockage> typeLieuStockages = new HashSet<>();


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresse() {
        return adresse;
    }

    public Localisation adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getCodePostal() {
        return codePostal;
    }

    public Localisation codePostal(String codePostal) {
        this.codePostal = codePostal;
        return this;
    }

    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
    }

    public String getVille() {
        return ville;
    }

    public Localisation ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getPays() {
        return pays;
    }

    public Localisation pays(String pays) {
        this.pays = pays;
        return this;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public Float getQuantite() {
        return quantite;
    }

    public Localisation quantite(Float quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Float quantite) {
        this.quantite = quantite;
    }

    public Set<TypeLieuStockage> getTypeLieuStockages() {
        return typeLieuStockages;
    }

    public Localisation typeLieuStockages(Set<TypeLieuStockage> typeLieuStockages) {
        this.typeLieuStockages = typeLieuStockages;
        return this;
    }
    public void setTypeLieuStockages(Set<TypeLieuStockage> typeLieuStockages) {
        this.typeLieuStockages = typeLieuStockages;
    }
    public Localisation addTypeLieuStockage(TypeLieuStockage typeLieuStockage) {
        this.typeLieuStockages.add(typeLieuStockage);
        typeLieuStockage.setLocalisation(this);
        return this;
    }

    public Localisation removeTypeLieuStockage(TypeLieuStockage typeLieuStockage) {
        this.typeLieuStockages.remove(typeLieuStockage);
        typeLieuStockage.setLocalisation(null);
        return this;
    }

    public Groupe getGroupe() {
        return groupe;
    }

    public void setGroupe(Groupe groupe) {
        this.groupe = groupe;
    }
    /**
    public FicheArticle getFicheArticle() {
        return ficheArticle;
    }

    public Localisation ficheArticle(FicheArticle ficheArticle) {
        this.ficheArticle = ficheArticle;
        return this;
    }

    public void setFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticle = ficheArticle;
    }**/
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Localisation localisation = (Localisation) o;
        if (localisation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), localisation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Localisation{" +
            "id=" + getId() +
            ", adresse='" + getAdresse() + "'" +
            ", codePostal='" + getCodePostal() + "'" +
            ", ville='" + getVille() + "'" +
            ", pays='" + getPays() + "'" +
            ", quantite=" + getQuantite() +
            "}";
    }
}
