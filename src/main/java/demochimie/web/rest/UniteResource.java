package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.Unite;
import demochimie.repository.UniteRepository;
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
 * REST controller for managing Unite.
 */
@RestController
@RequestMapping("/api")
public class UniteResource {

    private final Logger log = LoggerFactory.getLogger(UniteResource.class);

    private static final String ENTITY_NAME = "unite";

    private final UniteRepository uniteRepository;

    public UniteResource(UniteRepository uniteRepository) {
        this.uniteRepository = uniteRepository;
    }

    /**
     * POST  /unites : Create a new unite.
     *
     * @param unite the unite to create
     * @return the ResponseEntity with status 201 (Created) and with body the new unite, or with status 400 (Bad Request) if the unite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/unites")
    @Timed
    public ResponseEntity<Unite> createUnite(@RequestBody Unite unite) throws URISyntaxException {
        log.debug("REST request to save Unite : {}", unite);
        if (unite.getId() != null) {
            throw new BadRequestAlertException("A new unite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Unite result = uniteRepository.save(unite);
        return ResponseEntity.created(new URI("/api/unites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /unites : Updates an existing unite.
     *
     * @param unite the unite to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated unite,
     * or with status 400 (Bad Request) if the unite is not valid,
     * or with status 500 (Internal Server Error) if the unite couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/unites")
    @Timed
    public ResponseEntity<Unite> updateUnite(@RequestBody Unite unite) throws URISyntaxException {
        log.debug("REST request to update Unite : {}", unite);
        if (unite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Unite result = uniteRepository.save(unite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, unite.getId().toString()))
            .body(result);
    }

    /**
     * GET  /unites : get all the unites.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of unites in body
     */
    @GetMapping("/unites")
    @Timed
    public List<Unite> getAllUnites() {
        log.debug("REST request to get all Unites");
        return uniteRepository.findAll();
    }

    /**
     * GET  /unites/:id : get the "id" unite.
     *
     * @param id the id of the unite to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the unite, or with status 404 (Not Found)
     */
    @GetMapping("/unites/{id}")
    @Timed
    public ResponseEntity<Unite> getUnite(@PathVariable Long id) {
        log.debug("REST request to get Unite : {}", id);
        Optional<Unite> unite = uniteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(unite);
    }

    /**
     * DELETE  /unites/:id : delete the "id" unite.
     *
     * @param id the id of the unite to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/unites/{id}")
    @Timed
    public ResponseEntity<Void> deleteUnite(@PathVariable Long id) {
        log.debug("REST request to delete Unite : {}", id);

        uniteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
