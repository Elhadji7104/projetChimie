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
 * A Fournisseur.
 */
@Entity
@Table(name = "fournisseur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fournisseur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_fournisseur")
    private String nomFournisseur;

    @Column(name = "ref_fournisseur")
    private String ref_fournisseur;

    @Column(name = "adresse")
    private String adresse;

    public String getRef_fournisseur() {
        return ref_fournisseur;
    }

    public void setRef_fournisseur(String ref_fournisseur) {
        this.ref_fournisseur = ref_fournisseur;
    }

    @Column(name = "mail")
    private String mail;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "contact_pro")
    private String contactPro;

    @Column(name = "nom_pro")
    private String nomPro;

    public String getContactPro() {
        return contactPro;
    }

    public void setContactPro(String contactPro) {
        this.contactPro = contactPro;
    }

    @Column(name = "prenom_pro")
    private String prenomPro;

    @OneToMany(mappedBy = "fournisseurs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<FicheDeCommandeProduit> ficheDeCommandeProduits = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    


    public String getNomFournisseur() {
        return nomFournisseur;
    }

    public Fournisseur nomFournisseur(String nomFournisseur) {
        this.nomFournisseur = nomFournisseur;
        return this;
    }

    public void setNomFournisseur(String nomFournisseur) {
        this.nomFournisseur = nomFournisseur;
    }

    public String getAdresse() {
        return adresse;
    }

    public Fournisseur adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getMail() {
        return mail;
    }

    public Fournisseur mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getTelephone() {
        return telephone;
    }

    public Fournisseur telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Set<FicheDeCommandeProduit> getFicheDeCommandeProduits() {
        return ficheDeCommandeProduits;
    }

    public Fournisseur ficheDeCommandeProduits(Set<FicheDeCommandeProduit> ficheDeCommandeProduits) {
        this.ficheDeCommandeProduits = ficheDeCommandeProduits;
        return this;
    }

    public void setFicheDeCommandeProduits(Set<FicheDeCommandeProduit> ficheDeCommandeProduits) {
        this.ficheDeCommandeProduits = ficheDeCommandeProduits;
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
        Fournisseur fournisseur = (Fournisseur) o;
        if (fournisseur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fournisseur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fournisseur{" +
            "id=" + getId() +
            ", nomFournisseur='" + getNomFournisseur() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", mail='" + getMail() + "'" +
            ", telephone='" + getTelephone() + "'" +
            "}";
    }
}
