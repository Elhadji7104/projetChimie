package demochimie.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ListeMotsCles.
 */
@Entity
@Table(name = "liste_mots_cles")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ListeMotsCles implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle_mot")
    private String libelleMot;

    @ManyToOne
    @JsonIgnoreProperties("listeMotsCles")
    private FicheArticle ficheArticle;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelleMot() {
        return libelleMot;
    }

    public ListeMotsCles libelleMot(String libelleMot) {
        this.libelleMot = libelleMot;
        return this;
    }

    public void setLibelleMot(String libelleMot) {
        this.libelleMot = libelleMot;
    }

    public FicheArticle getFicheArticle() {
        return ficheArticle;
    }

    public ListeMotsCles ficheArticle(FicheArticle ficheArticle) {
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
        ListeMotsCles listeMotsCles = (ListeMotsCles) o;
        if (listeMotsCles.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), listeMotsCles.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ListeMotsCles{" +
            "id=" + getId() +
            ", libelleMot='" + getLibelleMot() + "'" +
            "}";
    }
}
