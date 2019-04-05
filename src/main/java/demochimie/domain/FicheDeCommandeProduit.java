package demochimie.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A FicheDeCommandeProduit.
 */
@Entity
@Table(name = "fiche_de_commande_produit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FicheDeCommandeProduit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantite")
    private Float quantite;

    @Column(name = "date_de_commande")
    private LocalDate dateDeCommande;

    @Column(name = "date_livraison")
    private LocalDate dateLivraison;

    @ManyToOne
    @JsonIgnoreProperties("fiche_de_commande_produit_fournisseur")
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "fiche_de_commande_produit_fournisseur",
               joinColumns = @JoinColumn(name = "fiche_de_commande_produits_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "fournisseurs_id", referencedColumnName = "id"))
    private Set<Fournisseur> fournisseurs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("ficheDeCommandeProduits")
    private FicheArticle ficheArticle;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getQuantite() {
        return quantite;
    }

    public FicheDeCommandeProduit quantite(Float quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Float quantite) {
        this.quantite = quantite;
    }

    public LocalDate getDateDeCommande() {
        return dateDeCommande;
    }

    public FicheDeCommandeProduit dateDeCommande(LocalDate dateDeCommande) {
        this.dateDeCommande = dateDeCommande;
        return this;
    }

    public void setDateDeCommande(LocalDate dateDeCommande) {
        this.dateDeCommande = dateDeCommande;
    }

    public LocalDate getDateLivraison() {
        return dateLivraison;
    }

    public FicheDeCommandeProduit dateLivraison(LocalDate dateLivraison) {
        this.dateLivraison = dateLivraison;
        return this;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setDateLivraison(LocalDate dateLivraison) {
        this.dateLivraison = dateLivraison;
    }

    public Set<Fournisseur> getFournisseurs() {
        return fournisseurs;
    }

    public FicheDeCommandeProduit fournisseurs(Set<Fournisseur> fournisseurs) {
        this.fournisseurs = fournisseurs;
        return this;
    }

    public FicheDeCommandeProduit addFournisseur(Fournisseur fournisseur) {
        this.fournisseurs.add(fournisseur);
        fournisseur.getFicheDeCommandeProduits().add(this);
        return this;
    }

    public FicheDeCommandeProduit removeFournisseur(Fournisseur fournisseur) {
        this.fournisseurs.remove(fournisseur);
        fournisseur.getFicheDeCommandeProduits().remove(this);
        return this;
    }

    public void setFournisseurs(Set<Fournisseur> fournisseurs) {
        this.fournisseurs = fournisseurs;
    }

    public FicheArticle getFicheArticle() {
        return ficheArticle;
    }

    public FicheDeCommandeProduit ficheArticle(FicheArticle ficheArticle) {
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
        FicheDeCommandeProduit ficheDeCommandeProduit = (FicheDeCommandeProduit) o;
        if (ficheDeCommandeProduit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ficheDeCommandeProduit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FicheDeCommandeProduit{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", dateDeCommande='" + getDateDeCommande() + "'" +
            ", dateLivraison='" + getDateLivraison() + "'" +
            "}";
    }
}
