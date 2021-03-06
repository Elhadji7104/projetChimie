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
 * A DroitDacceeProduit.
 */
@Entity
@Table(name = "droit_daccee_produit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DroitDacceeProduit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "droitDacceeProduit")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Groupe> groupes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("droitDacceeProduits")
    private Groupe groupe;

    @ManyToOne
    @JsonIgnoreProperties("droitDacceeProduits")
    private FicheArticle ficheArticle;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FicheArticle getFicheArticle() {
        return ficheArticle;
    }

    public void setFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticle = ficheArticle;
    }

    public Set<Groupe> getGroupes() {
        return groupes;
    }

    public DroitDacceeProduit groupes(Set<Groupe> groupes) {
        this.groupes = groupes;
        return this;
    }

    public DroitDacceeProduit addGroupe(Groupe groupe) {
        this.groupes.add(groupe);
        groupe.setDroitDacceeProduit(this);
        return this;
    }

    public DroitDacceeProduit removeGroupe(Groupe groupe) {
        this.groupes.remove(groupe);
        groupe.setDroitDacceeProduit(null);
        return this;
    }

    public void setGroupes(Set<Groupe> groupes) {
        this.groupes = groupes;
    }


    public Groupe getGroupe() {
        return groupe;
    }

    public DroitDacceeProduit groupe(Groupe groupe) {
        this.groupe = groupe;
        return this;
    }

    public void setGroupe(Groupe groupe) {
        this.groupe = groupe;
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
        DroitDacceeProduit droitDacceeProduit = (DroitDacceeProduit) o;
        if (droitDacceeProduit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), droitDacceeProduit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DroitDacceeProduit{" +
            "id=" + getId() +
            ", idGroupe='" + getGroupe() + "'" +
            ", idFicheArticle='" + getFicheArticle() + "'" +
            "}";
    }
}
