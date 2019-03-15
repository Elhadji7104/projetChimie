package demochimie.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A FicheRetourProduit.
 */
@Entity
@Table(name = "fiche_retour_produit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FicheRetourProduit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantite")
    private Float quantite;

    @Column(name = "date_retour")
    private LocalDate dateRetour;

    @ManyToOne
    @JsonIgnoreProperties("ficheRetourProduits")
    private FicheArticle ficheArticle;


    @ManyToOne
    @JsonIgnoreProperties("ficheRetourProduits")
    private User user;
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Float getQuantite() {
        return quantite;
    }

    public FicheRetourProduit quantite(Float quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Float quantite) {
        this.quantite = quantite;
    }

    public LocalDate getDateRetour() {
        return dateRetour;
    }

    public FicheRetourProduit dateRetour(LocalDate dateRetour) {
        this.dateRetour = dateRetour;
        return this;
    }

    public void setDateRetour(LocalDate dateRetour) {
        this.dateRetour = dateRetour;
    }

    public FicheArticle getFicheArticle() {
        return ficheArticle;
    }

    public FicheRetourProduit ficheArticle(FicheArticle ficheArticle) {
        this.ficheArticle = ficheArticle;
        return this;
    }

    public void setFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticle = ficheArticle;
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
        FicheRetourProduit ficheRetourProduit = (FicheRetourProduit) o;
        if (ficheRetourProduit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ficheRetourProduit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FicheRetourProduit{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", dateRetour='" + getDateRetour() + "'" +
            "}";
    }
}
