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
