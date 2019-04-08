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
 * A Groupe.
 */
@Entity
@Table(name = "groupe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Groupe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_groupe")
    private String nomGroupe;
    @Column(name = "local_groupe")
    private String localGroupe;

    @OneToMany(mappedBy = "groupe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DroitDacceeProduit> droitDacceeProduits = new HashSet<>();
    @OneToMany(mappedBy = "groupe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MailGestionnaire> mailGestionnaires = new HashSet<>();
    @OneToMany(mappedBy = "groupe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ListeGroupeInvite> listeGroupeInvites = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("groupes")
    private DroitDacceeProduit droitDacceeProduit;
    //un groupe a une liste typeDeConditionnements
    @OneToMany(mappedBy = "groupe")
    private Set<TypeDeConditionnement> typeDeConditionnements = new HashSet<>();
    //un groupe a une liste de classification
    @OneToMany(mappedBy = "groupe")
    private Set<Classification> classifications = new HashSet<>();
    //un groupe a une liste de localisation
    @OneToMany(mappedBy = "groupe")
    private Set<Localisation> localisations = new HashSet<>();

    //Un groupe a plusieurs aticles
    @OneToMany(mappedBy = "groupe")
    private Set<FicheArticle> ficheArticles = new HashSet<>();

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

    public Groupe nomGroupe(String nomGroupe) {
        this.nomGroupe = nomGroupe;
        return this;
    }
    public Set<FicheArticle> getFicheArticle() {
        return ficheArticles;
    }

    public void setFicheArticle(Set<FicheArticle> ficheArticles) {
        ficheArticles = ficheArticles;
    }
    public void setNomGroupe(String nomGroupe) {
        this.nomGroupe = nomGroupe;
    }

    public String getLocalGroupe() {
        return localGroupe;
    }

    public Groupe localGroupe(String localGroupe) {
        this.localGroupe = localGroupe;
        return this;
    }


    public Set<TypeDeConditionnement> getTypeDeConditionnements() {
        return typeDeConditionnements;
    }

    public void setTypeDeConditionnements(Set<TypeDeConditionnement> typeDeConditionnements) {
        this.typeDeConditionnements = typeDeConditionnements;
    }

    public Set<Localisation> getLocalisations() {
        return localisations;
    }

    public void setLocalisations(Set<Localisation> localisations) {
        this.localisations = localisations;
    }

    public void setLocalGroupe(String localGroupe) {
        this.localGroupe = localGroupe;
    }

    public Set<DroitDacceeProduit> getDroitDacceeProduits() {
        return droitDacceeProduits;
    }

    public Groupe droitDacceeProduits(Set<DroitDacceeProduit> droitDacceeProduits) {
        this.droitDacceeProduits = droitDacceeProduits;
        return this;
    }

    public Groupe addDroitDacceeProduit(DroitDacceeProduit droitDacceeProduit) {
        this.droitDacceeProduits.add(droitDacceeProduit);
        droitDacceeProduit.setGroupe(this);
        return this;
    }

    public Set<Classification> getClassifications() {
        return classifications;
    }

    public void setClassifications(Set<Classification> classifications) {
        this.classifications = classifications;
    }

    public Groupe removeDroitDacceeProduit(DroitDacceeProduit droitDacceeProduit) {
        this.droitDacceeProduits.remove(droitDacceeProduit);
        droitDacceeProduit.setGroupe(null);
        return this;
    }

    public void setDroitDacceeProduits(Set<DroitDacceeProduit> droitDacceeProduits) {
        this.droitDacceeProduits = droitDacceeProduits;
    }

    public Set<MailGestionnaire> getMailGestionnaires() {
        return mailGestionnaires;
    }

    public Groupe mailGestionnaires(Set<MailGestionnaire> mailGestionnaires) {
        this.mailGestionnaires = mailGestionnaires;
        return this;
    }

    public Groupe addMailGestionnaire(MailGestionnaire mailGestionnaire) {
        this.mailGestionnaires.add(mailGestionnaire);
        mailGestionnaire.setGroupe(this);
        return this;
    }

    public Groupe removeMailGestionnaire(MailGestionnaire mailGestionnaire) {
        this.mailGestionnaires.remove(mailGestionnaire);
        mailGestionnaire.setGroupe(null);
        return this;
    }

    public void setMailGestionnaires(Set<MailGestionnaire> mailGestionnaires) {
        this.mailGestionnaires = mailGestionnaires;
    }

    public Set<ListeGroupeInvite> getListeGroupeInvites() {
        return listeGroupeInvites;
    }

    public Groupe listeGroupeInvites(Set<ListeGroupeInvite> listeGroupeInvites) {
        this.listeGroupeInvites = listeGroupeInvites;
        return this;
    }

    public Groupe addListeGroupeInvite(ListeGroupeInvite listeGroupeInvite) {
        this.listeGroupeInvites.add(listeGroupeInvite);
        listeGroupeInvite.setGroupe(this);
        return this;
    }

    public Groupe removeListeGroupeInvite(ListeGroupeInvite listeGroupeInvite) {
        this.listeGroupeInvites.remove(listeGroupeInvite);
        listeGroupeInvite.setGroupe(null);
        return this;
    }

    public void setListeGroupeInvites(Set<ListeGroupeInvite> listeGroupeInvites) {
        this.listeGroupeInvites = listeGroupeInvites;
    }

    public DroitDacceeProduit getDroitDacceeProduit() {
        return droitDacceeProduit;
    }

    public Groupe droitDacceeProduit(DroitDacceeProduit droitDacceeProduit) {
        this.droitDacceeProduit = droitDacceeProduit;
        return this;
    }

    public void setDroitDacceeProduit(DroitDacceeProduit droitDacceeProduit) {
        this.droitDacceeProduit = droitDacceeProduit;
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
        Groupe groupe = (Groupe) o;
        if (groupe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), groupe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Groupe{" +
            "id=" + getId() +
            ", nomGroupe='" + getNomGroupe() + "'" +
            ", localGroupe='" + getLocalGroupe() + "'" +
            "}";
    }
}
