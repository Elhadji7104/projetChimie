package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.ListeCmr;
import demochimie.repository.ListeCmrRepository;
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
 * REST controller for managing ListeCmr.
 */
@RestController
@RequestMapping("/api")
public class ListeCmrResource {

    private final Logger log = LoggerFactory.getLogger(ListeCmrResource.class);

    private static final String ENTITY_NAME = "listeCmr";

    private final ListeCmrRepository listeCmrRepository;

    public ListeCmrResource(ListeCmrRepository listeCmrRepository) {
        this.listeCmrRepository = listeCmrRepository;
    }

    /**
     * POST  /liste-cmrs : Create a new listeCmr.
     *
     * @param listeCmr the listeCmr to create
     * @return the ResponseEntity with status 201 (Created) and with body the new listeCmr, or with status 400 (Bad Request) if the listeCmr has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/liste-cmrs")
    @Timed
    public ResponseEntity<ListeCmr> createListeCmr(@RequestBody ListeCmr listeCmr) throws URISyntaxException {
        log.debug("REST request to save ListeCmr : {}", listeCmr);
        if (listeCmr.getId() != null) {
            throw new BadRequestAlertException("A new listeCmr cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ListeCmr result = listeCmrRepository.save(listeCmr);
        return ResponseEntity.created(new URI("/api/liste-cmrs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /liste-cmrs : Updates an existing listeCmr.
     *
     * @param listeCmr the listeCmr to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated listeCmr,
     * or with status 400 (Bad Request) if the listeCmr is not valid,
     * or with status 500 (Internal Server Error) if the listeCmr couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/liste-cmrs")
    @Timed
    public ResponseEntity<ListeCmr> updateListeCmr(@RequestBody ListeCmr listeCmr) throws URISyntaxException {
        log.debug("REST request to update ListeCmr : {}", listeCmr);
        if (listeCmr.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ListeCmr result = listeCmrRepository.save(listeCmr);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, listeCmr.getId().toString()))
            .body(result);
    }

    /**
     * GET  /liste-cmrs : get all the listeCmrs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of listeCmrs in body
     */
    @GetMapping("/liste-cmrs")
    @Timed
    public List<ListeCmr> getAllListeCmrs() {
        log.debug("REST request to get all ListeCmrs");
        return listeCmrRepository.findAll();
    }

    /**
     * GET  /liste-cmrs/:id : get the "id" listeCmr.
     *
     * @param id the id of the listeCmr to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the listeCmr, or with status 404 (Not Found)
     */
    @GetMapping("/liste-cmrs/{id}")
    @Timed
    public ResponseEntity<ListeCmr> getListeCmr(@PathVariable Long id) {
        log.debug("REST request to get ListeCmr : {}", id);
        Optional<ListeCmr> listeCmr = listeCmrRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(listeCmr);
    }

    /**
     * DELETE  /liste-cmrs/:id : delete the "id" listeCmr.
     *
     * @param id the id of the listeCmr to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/liste-cmrs/{id}")
    @Timed
    public ResponseEntity<Void> deleteListeCmr(@PathVariable Long id) {
        log.debug("REST request to delete ListeCmr : {}", id);

        listeCmrRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
