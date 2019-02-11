package demochimie.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ListeCmr.
 */
@Entity
@Table(name = "liste_cmr")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ListeCmr implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ref_liste")
    private String refListe;

    @ManyToOne
    @JsonIgnoreProperties("listeCmrs")
    private FicheProduitChimique ficheProduitChimique;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRefListe() {
        return refListe;
    }

    public ListeCmr refListe(String refListe) {
        this.refListe = refListe;
        return this;
    }

    public void setRefListe(String refListe) {
        this.refListe = refListe;
    }

    public FicheProduitChimique getFicheProduitChimique() {
        return ficheProduitChimique;
    }

    public ListeCmr ficheProduitChimique(FicheProduitChimique ficheProduitChimique) {
        this.ficheProduitChimique = ficheProduitChimique;
        return this;
    }

    public void setFicheProduitChimique(FicheProduitChimique ficheProduitChimique) {
        this.ficheProduitChimique = ficheProduitChimique;
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
        ListeCmr listeCmr = (ListeCmr) o;
        if (listeCmr.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), listeCmr.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ListeCmr{" +
            "id=" + getId() +
            ", refListe='" + getRefListe() + "'" +
            "}";
    }
}
