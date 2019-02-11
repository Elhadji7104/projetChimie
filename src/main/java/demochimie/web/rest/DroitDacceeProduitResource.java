package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.DroitDacceeProduit;
import demochimie.repository.DroitDacceeProduitRepository;
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
 * REST controller for managing DroitDacceeProduit.
 */
@RestController
@RequestMapping("/api")
public class DroitDacceeProduitResource {

    private final Logger log = LoggerFactory.getLogger(DroitDacceeProduitResource.class);

    private static final String ENTITY_NAME = "droitDacceeProduit";

    private final DroitDacceeProduitRepository droitDacceeProduitRepository;

    public DroitDacceeProduitResource(DroitDacceeProduitRepository droitDacceeProduitRepository) {
        this.droitDacceeProduitRepository = droitDacceeProduitRepository;
    }

    /**
     * POST  /droit-daccee-produits : Create a new droitDacceeProduit.
     *
     * @param droitDacceeProduit the droitDacceeProduit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new droitDacceeProduit, or with status 400 (Bad Request) if the droitDacceeProduit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/droit-daccee-produits")
    @Timed
    public ResponseEntity<DroitDacceeProduit> createDroitDacceeProduit(@RequestBody DroitDacceeProduit droitDacceeProduit) throws URISyntaxException {
        log.debug("REST request to save DroitDacceeProduit : {}", droitDacceeProduit);
        if (droitDacceeProduit.getId() != null) {
            throw new BadRequestAlertException("A new droitDacceeProduit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DroitDacceeProduit result = droitDacceeProduitRepository.save(droitDacceeProduit);
        return ResponseEntity.created(new URI("/api/droit-daccee-produits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /droit-daccee-produits : Updates an existing droitDacceeProduit.
     *
     * @param droitDacceeProduit the droitDacceeProduit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated droitDacceeProduit,
     * or with status 400 (Bad Request) if the droitDacceeProduit is not valid,
     * or with status 500 (Internal Server Error) if the droitDacceeProduit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/droit-daccee-produits")
    @Timed
    public ResponseEntity<DroitDacceeProduit> updateDroitDacceeProduit(@RequestBody DroitDacceeProduit droitDacceeProduit) throws URISyntaxException {
        log.debug("REST request to update DroitDacceeProduit : {}", droitDacceeProduit);
        if (droitDacceeProduit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DroitDacceeProduit result = droitDacceeProduitRepository.save(droitDacceeProduit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, droitDacceeProduit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /droit-daccee-produits : get all the droitDacceeProduits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of droitDacceeProduits in body
     */
    @GetMapping("/droit-daccee-produits")
    @Timed
    public List<DroitDacceeProduit> getAllDroitDacceeProduits() {
        log.debug("REST request to get all DroitDacceeProduits");
        return droitDacceeProduitRepository.findAll();
    }

    /**
     * GET  /droit-daccee-produits/:id : get the "id" droitDacceeProduit.
     *
     * @param id the id of the droitDacceeProduit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the droitDacceeProduit, or with status 404 (Not Found)
     */
    @GetMapping("/droit-daccee-produits/{id}")
    @Timed
    public ResponseEntity<DroitDacceeProduit> getDroitDacceeProduit(@PathVariable Long id) {
        log.debug("REST request to get DroitDacceeProduit : {}", id);
        Optional<DroitDacceeProduit> droitDacceeProduit = droitDacceeProduitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(droitDacceeProduit);
    }

    /**
     * DELETE  /droit-daccee-produits/:id : delete the "id" droitDacceeProduit.
     *
     * @param id the id of the droitDacceeProduit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/droit-daccee-produits/{id}")
    @Timed
    public ResponseEntity<Void> deleteDroitDacceeProduit(@PathVariable Long id) {
        log.debug("REST request to delete DroitDacceeProduit : {}", id);

        droitDacceeProduitRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
