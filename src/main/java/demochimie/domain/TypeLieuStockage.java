package demochimie.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TypeLieuStockage.
 */
@Entity
@Table(name = "type_lieu_stockage")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TypeLieuStockage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle_lieu")
    private String libelleLieu;

    @Column(name = "temperature")
    private Float temperature;

    @ManyToOne
    @JsonIgnoreProperties("typeLieuStockages")
    private Localisation localisation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelleLieu() {
        return libelleLieu;
    }

    public TypeLieuStockage libelleLieu(String libelleLieu) {
        this.libelleLieu = libelleLieu;
        return this;
    }

    public void setLibelleLieu(String libelleLieu) {
        this.libelleLieu = libelleLieu;
    }

    public Float getTemperature() {
        return temperature;
    }

    public TypeLieuStockage temperature(Float temperature) {
        this.temperature = temperature;
        return this;
    }

    public void setTemperature(Float temperature) {
        this.temperature = temperature;
    }

    public Localisation getLocalisation() {
        return localisation;
    }

    public TypeLieuStockage localisation(Localisation localisation) {
        this.localisation = localisation;
        return this;
    }

    public void setLocalisation(Localisation localisation) {
        this.localisation = localisation;
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
        TypeLieuStockage typeLieuStockage = (TypeLieuStockage) o;
        if (typeLieuStockage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), typeLieuStockage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TypeLieuStockage{" +
            "id=" + getId() +
            ", libelleLieu='" + getLibelleLieu() + "'" +
            ", temperature=" + getTemperature() +
            "}";
    }
}
