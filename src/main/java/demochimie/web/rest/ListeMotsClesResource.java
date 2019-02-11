package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.ListeMotsCles;
import demochimie.repository.ListeMotsClesRepository;
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
 * REST controller for managing ListeMotsCles.
 */
@RestController
@RequestMapping("/api")
public class ListeMotsClesResource {

    private final Logger log = LoggerFactory.getLogger(ListeMotsClesResource.class);

    private static final String ENTITY_NAME = "listeMotsCles";

    private final ListeMotsClesRepository listeMotsClesRepository;

    public ListeMotsClesResource(ListeMotsClesRepository listeMotsClesRepository) {
        this.listeMotsClesRepository = listeMotsClesRepository;
    }

    /**
     * POST  /liste-mots-cles : Create a new listeMotsCles.
     *
     * @param listeMotsCles the listeMotsCles to create
     * @return the ResponseEntity with status 201 (Created) and with body the new listeMotsCles, or with status 400 (Bad Request) if the listeMotsCles has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/liste-mots-cles")
    @Timed
    public ResponseEntity<ListeMotsCles> createListeMotsCles(@RequestBody ListeMotsCles listeMotsCles) throws URISyntaxException {
        log.debug("REST request to save ListeMotsCles : {}", listeMotsCles);
        if (listeMotsCles.getId() != null) {
            throw new BadRequestAlertException("A new listeMotsCles cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ListeMotsCles result = listeMotsClesRepository.save(listeMotsCles);
        return ResponseEntity.created(new URI("/api/liste-mots-cles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /liste-mots-cles : Updates an existing listeMotsCles.
     *
     * @param listeMotsCles the listeMotsCles to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated listeMotsCles,
     * or with status 400 (Bad Request) if the listeMotsCles is not valid,
     * or with status 500 (Internal Server Error) if the listeMotsCles couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/liste-mots-cles")
    @Timed
    public ResponseEntity<ListeMotsCles> updateListeMotsCles(@RequestBody ListeMotsCles listeMotsCles) throws URISyntaxException {
        log.debug("REST request to update ListeMotsCles : {}", listeMotsCles);
        if (listeMotsCles.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ListeMotsCles result = listeMotsClesRepository.save(listeMotsCles);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, listeMotsCles.getId().toString()))
            .body(result);
    }

    /**
     * GET  /liste-mots-cles : get all the listeMotsCles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of listeMotsCles in body
     */
    @GetMapping("/liste-mots-cles")
    @Timed
    public List<ListeMotsCles> getAllListeMotsCles() {
        log.debug("REST request to get all ListeMotsCles");
        return listeMotsClesRepository.findAll();
    }

    /**
     * GET  /liste-mots-cles/:id : get the "id" listeMotsCles.
     *
     * @param id the id of the listeMotsCles to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the listeMotsCles, or with status 404 (Not Found)
     */
    @GetMapping("/liste-mots-cles/{id}")
    @Timed
    public ResponseEntity<ListeMotsCles> getListeMotsCles(@PathVariable Long id) {
        log.debug("REST request to get ListeMotsCles : {}", id);
        Optional<ListeMotsCles> listeMotsCles = listeMotsClesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(listeMotsCles);
    }

    /**
     * DELETE  /liste-mots-cles/:id : delete the "id" listeMotsCles.
     *
     * @param id the id of the listeMotsCles to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/liste-mots-cles/{id}")
    @Timed
    public ResponseEntity<Void> deleteListeMotsCles(@PathVariable Long id) {
        log.debug("REST request to delete ListeMotsCles : {}", id);

        listeMotsClesRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
