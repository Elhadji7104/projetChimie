package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.TypeLieuStockage;
import demochimie.repository.TypeLieuStockageRepository;
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
 * REST controller for managing TypeLieuStockage.
 */
@RestController
@RequestMapping("/api")
public class TypeLieuStockageResource {

    private final Logger log = LoggerFactory.getLogger(TypeLieuStockageResource.class);

    private static final String ENTITY_NAME = "typeLieuStockage";

    private final TypeLieuStockageRepository typeLieuStockageRepository;

    public TypeLieuStockageResource(TypeLieuStockageRepository typeLieuStockageRepository) {
        this.typeLieuStockageRepository = typeLieuStockageRepository;
    }

    /**
     * POST  /type-lieu-stockages : Create a new typeLieuStockage.
     *
     * @param typeLieuStockage the typeLieuStockage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new typeLieuStockage, or with status 400 (Bad Request) if the typeLieuStockage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/type-lieu-stockages")
    @Timed
    public ResponseEntity<TypeLieuStockage> createTypeLieuStockage(@RequestBody TypeLieuStockage typeLieuStockage) throws URISyntaxException {
        log.debug("REST request to save TypeLieuStockage : {}", typeLieuStockage);
        if (typeLieuStockage.getId() != null) {
            throw new BadRequestAlertException("A new typeLieuStockage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeLieuStockage result = typeLieuStockageRepository.save(typeLieuStockage);
        return ResponseEntity.created(new URI("/api/type-lieu-stockages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /type-lieu-stockages : Updates an existing typeLieuStockage.
     *
     * @param typeLieuStockage the typeLieuStockage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated typeLieuStockage,
     * or with status 400 (Bad Request) if the typeLieuStockage is not valid,
     * or with status 500 (Internal Server Error) if the typeLieuStockage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/type-lieu-stockages")
    @Timed
    public ResponseEntity<TypeLieuStockage> updateTypeLieuStockage(@RequestBody TypeLieuStockage typeLieuStockage) throws URISyntaxException {
        log.debug("REST request to update TypeLieuStockage : {}", typeLieuStockage);
        if (typeLieuStockage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TypeLieuStockage result = typeLieuStockageRepository.save(typeLieuStockage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, typeLieuStockage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /type-lieu-stockages : get all the typeLieuStockages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of typeLieuStockages in body
     */
    @GetMapping("/type-lieu-stockages")
    @Timed
    public List<TypeLieuStockage> getAllTypeLieuStockages() {
        log.debug("REST request to get all TypeLieuStockages");
        return typeLieuStockageRepository.findAll();
    }

    /**
     * GET  /type-lieu-stockages/:id : get the "id" typeLieuStockage.
     *
     * @param id the id of the typeLieuStockage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the typeLieuStockage, or with status 404 (Not Found)
     */
    @GetMapping("/type-lieu-stockages/{id}")
    @Timed
    public ResponseEntity<TypeLieuStockage> getTypeLieuStockage(@PathVariable Long id) {
        log.debug("REST request to get TypeLieuStockage : {}", id);
        Optional<TypeLieuStockage> typeLieuStockage = typeLieuStockageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeLieuStockage);
    }

    /**
     * DELETE  /type-lieu-stockages/:id : delete the "id" typeLieuStockage.
     *
     * @param id the id of the typeLieuStockage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/type-lieu-stockages/{id}")
    @Timed
    public ResponseEntity<Void> deleteTypeLieuStockage(@PathVariable Long id) {
        log.debug("REST request to delete TypeLieuStockage : {}", id);

        typeLieuStockageRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
