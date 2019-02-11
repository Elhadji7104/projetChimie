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
 * A Document.
 */
@Entity
@Table(name = "document")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lien")
    private String lien;

    @ManyToMany(mappedBy = "documents")
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

    public String getLien() {
        return lien;
    }

    public Document lien(String lien) {
        this.lien = lien;
        return this;
    }

    public void setLien(String lien) {
        this.lien = lien;
    }

    public Set<FicheArticle> getFicheArticles() {
        return ficheArticles;
    }

    public Document ficheArticles(Set<FicheArticle> ficheArticles) {
        this.ficheArticles = ficheArticles;
        return this;
    }

    public Document addFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticles.add(ficheArticle);
        ficheArticle.getDocuments().add(this);
        return this;
    }

    public Document removeFicheArticle(FicheArticle ficheArticle) {
        this.ficheArticles.remove(ficheArticle);
        ficheArticle.getDocuments().remove(this);
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
        Document document = (Document) o;
        if (document.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), document.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", lien='" + getLien() + "'" +
            "}";
    }
}
