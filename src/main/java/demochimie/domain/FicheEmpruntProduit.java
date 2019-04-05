package demochimie.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A FicheEmpruntProduit.
 */
@Entity
@Table(name = "fiche_emprunt_produit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FicheEmpruntProduit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantite")
    private float quantite;

    @Column(name = "date_emprunt")
    private LocalDate dateEmprunt;

    @ManyToOne
    @JsonIgnoreProperties({"ficheEmprunt", "documents", "unites", "ficheProduitChimiques", "classifications"})
    private FicheArticle ficheArticle;

    @ManyToOne
    @JsonIgnoreProperties("ficheEmpruntProduits")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getQuantite() {
        return quantite;
    }

    public FicheEmpruntProduit quantite(float quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(float quantite) {
        this.quantite = quantite;
    }

    public LocalDate getDateEmprunt() {
        return dateEmprunt;
    }

    public FicheEmpruntProduit dateEmprunt(LocalDate dateEmprunt) {
        this.dateEmprunt = dateEmprunt;
        return this;
    }

    public void setDateEmprunt(LocalDate dateEmprunt) {
        this.dateEmprunt = dateEmprunt;
    }

    public FicheArticle getFicheArticle() {
        return ficheArticle;
    }

    public void setFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticle = ficheArticle;
    }

    public FicheEmpruntProduit ficheArticle(FicheArticle ficheArticle) {
        this.ficheArticle = ficheArticle;
        return this;
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
        FicheEmpruntProduit ficheEmpruntProduit = (FicheEmpruntProduit) o;
        if (ficheEmpruntProduit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ficheEmpruntProduit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FicheEmpruntProduit{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", dateEmprunt='" + getDateEmprunt() + "'" +
            ", User='" + getUser()+ "'" +
            "}";
    }
}
