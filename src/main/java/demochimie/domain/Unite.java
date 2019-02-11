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
 * A Unite.
 */
@Entity
@Table(name = "unite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Unite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle_unite")
    private String libelleUnite;

    @ManyToMany(mappedBy = "unites")
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

    public String getLibelleUnite() {
        return libelleUnite;
    }

    public Unite libelleUnite(String libelleUnite) {
        this.libelleUnite = libelleUnite;
        return this;
    }

    public void setLibelleUnite(String libelleUnite) {
        this.libelleUnite = libelleUnite;
    }

    public Set<FicheArticle> getFicheArticles() {
        return ficheArticles;
    }

    public Unite ficheArticles(Set<FicheArticle> ficheArticles) {
        this.ficheArticles = ficheArticles;
        return this;
    }

    public Unite addFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticles.add(ficheArticle);
        ficheArticle.getUnites().add(this);
        return this;
    }

    public Unite removeFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticles.remove(ficheArticle);
        ficheArticle.getUnites().remove(this);
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
        Unite unite = (Unite) o;
        if (unite.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), unite.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Unite{" +
            "id=" + getId() +
            ", libelleUnite='" + getLibelleUnite() + "'" +
            "}";
    }
}
