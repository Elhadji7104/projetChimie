package demochimie.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ListeGroupeInvite.
 */
@Entity
@Table(name = "liste_groupe_invite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ListeGroupeInvite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_groupe")
    private String nomGroupe;

    @ManyToOne
    @JsonIgnoreProperties("listeGroupeInvites")
    private Groupe groupe;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomGroupe() {
        return nomGroupe;
    }

    public ListeGroupeInvite nomGroupe(String nomGroupe) {
        this.nomGroupe = nomGroupe;
        return this;
    }

    public void setNomGroupe(String nomGroupe) {
        this.nomGroupe = nomGroupe;
    }

    public Groupe getGroupe() {
        return groupe;
    }

    public ListeGroupeInvite groupe(Groupe groupe) {
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
        ListeGroupeInvite listeGroupeInvite = (ListeGroupeInvite) o;
        if (listeGroupeInvite.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), listeGroupeInvite.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ListeGroupeInvite{" +
            "id=" + getId() +
            ", nomGroupe='" + getNomGroupe() + "'" +
            "}";
    }
}
