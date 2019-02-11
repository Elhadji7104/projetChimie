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
 * A Classification.
 */
@Entity
@Table(name = "classification")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Classification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_classification")
    private String nomClassification;

    @ManyToMany(mappedBy = "classifications")
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

    public String getNomClassification() {
        return nomClassification;
    }

    public Classification nomClassification(String nomClassification) {
        this.nomClassification = nomClassification;
        return this;
    }

    public void setNomClassification(String nomClassification) {
        this.nomClassification = nomClassification;
    }

    public Set<FicheArticle> getFicheArticles() {
        return ficheArticles;
    }

    public Classification ficheArticles(Set<FicheArticle> ficheArticles) {
        this.ficheArticles = ficheArticles;
        return this;
    }

    public Classification addFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticles.add(ficheArticle);
        ficheArticle.getClassifications().add(this);
        return this;
    }

    public Classification removeFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticles.remove(ficheArticle);
        ficheArticle.getClassifications().remove(this);
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
        Classification classification = (Classification) o;
        if (classification.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classification.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Classification{" +
            "id=" + getId() +
            ", nomClassification='" + getNomClassification() + "'" +
            "}";
    }
}
