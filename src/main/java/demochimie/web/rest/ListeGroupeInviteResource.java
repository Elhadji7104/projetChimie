package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.ListeGroupeInvite;
import demochimie.repository.ListeGroupeInviteRepository;
import demochimie.web.rest.errors.BadRequestAlertException;
import demochimie.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ListeGroupeInvite.
 */
@RestController
@RequestMapping("/api")
public class ListeGroupeInviteResource {

    private final Logger log = LoggerFactory.getLogger(ListeGroupeInviteResource.class);

    private static final String ENTITY_NAME = "listeGroupeInvite";

    private final ListeGroupeInviteRepository listeGroupeInviteRepository;

    public ListeGroupeInviteResource(ListeGroupeInviteRepository listeGroupeInviteRepository) {
        this.listeGroupeInviteRepository = listeGroupeInviteRepository;
    }

    /**
     * POST  /liste-groupe-invites : Create a new listeGroupeInvite.
     *
     * @param listeGroupeInvite the listeGroupeInvite to create
     * @return the ResponseEntity with status 201 (Created) and with body the new listeGroupeInvite, or with status 400 (Bad Request) if the listeGroupeInvite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/liste-groupe-invites")
    @Timed
    public ResponseEntity<ListeGroupeInvite> createListeGroupeInvite(@RequestBody ListeGroupeInvite listeGroupeInvite) throws URISyntaxException {
        log.debug("REST request to save ListeGroupeInvite : {}", listeGroupeInvite);
        if (listeGroupeInvite.getId() != null) {
            throw new BadRequestAlertException("A new listeGroupeInvite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ListeGroupeInvite result = listeGroupeInviteRepository.save(listeGroupeInvite);
        return ResponseEntity.created(new URI("/api/liste-groupe-invites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /liste-groupe-invites : Updates an existing listeGroupeInvite.
     *
     * @param listeGroupeInvite the listeGroupeInvite to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated listeGroupeInvite,
     * or with status 400 (Bad Request) if the listeGroupeInvite is not valid,
     * or with status 500 (Internal Server Error) if the listeGroupeInvite couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/liste-groupe-invites")
    @Timed
    public ResponseEntity<ListeGroupeInvite> updateListeGroupeInvite(@RequestBody ListeGroupeInvite listeGroupeInvite) throws URISyntaxException {
        log.debug("REST request to update ListeGroupeInvite : {}", listeGroupeInvite);
        if (listeGroupeInvite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ListeGroupeInvite result = listeGroupeInviteRepository.save(listeGroupeInvite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, listeGroupeInvite.getId().toString()))
            .body(result);
    }

    /**
     * GET  /liste-groupe-invites : get all the listeGroupeInvites.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of listeGroupeInvites in body
     */
    @GetMapping("/liste-groupe-invites")
    @Timed
    public List<ListeGroupeInvite> getAllListeGroupeInvites() {
        log.debug("REST request to get all ListeGroupeInvites");
        return listeGroupeInviteRepository.findAll();
    }

    /**
     * GET  /liste-groupe-invites/:id : get the "id" listeGroupeInvite.
     *
     * @param id the id of the listeGroupeInvite to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the listeGroupeInvite, or with status 404 (Not Found)
     */
    @GetMapping("/liste-groupe-invites/{id}")
    @Timed
    public ResponseEntity<ListeGroupeInvite> getListeGroupeInvite(@PathVariable Long id) {
        log.debug("REST request to get ListeGroupeInvite : {}", id);
        Optional<ListeGroupeInvite> listeGroupeInvite = listeGroupeInviteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(listeGroupeInvite);
    }

    /**
     * DELETE  /liste-groupe-invites/:id : delete the "id" listeGroupeInvite.
     *
     * @param id the id of the listeGroupeInvite to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/liste-groupe-invites/{id}")
    @Timed
    public ResponseEntity<Void> deleteListeGroupeInvite(@PathVariable Long id) {
        log.debug("REST request to delete ListeGroupeInvite : {}", id);

        listeGroupeInviteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
