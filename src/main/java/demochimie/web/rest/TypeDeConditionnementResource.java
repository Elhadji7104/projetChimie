package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.TypeDeConditionnement;
import demochimie.repository.TypeDeConditionnementRepository;
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
 * REST controller for managing TypeDeConditionnement.
 */
@RestController
@RequestMapping("/api")
public class TypeDeConditionnementResource {

    private final Logger log = LoggerFactory.getLogger(TypeDeConditionnementResource.class);

    private static final String ENTITY_NAME = "typeDeConditionnement";

    private final TypeDeConditionnementRepository typeDeConditionnementRepository;

    public TypeDeConditionnementResource(TypeDeConditionnementRepository typeDeConditionnementRepository) {
        this.typeDeConditionnementRepository = typeDeConditionnementRepository;
    }

    /**
     * POST  /type-de-conditionnements : Create a new typeDeConditionnement.
     *
     * @param typeDeConditionnement the typeDeConditionnement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new typeDeConditionnement, or with status 400 (Bad Request) if the typeDeConditionnement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/type-de-conditionnements")
    @Timed
    public ResponseEntity<TypeDeConditionnement> createTypeDeConditionnement(@RequestBody TypeDeConditionnement typeDeConditionnement) throws URISyntaxException {
        log.debug("REST request to save TypeDeConditionnement : {}", typeDeConditionnement);
        if (typeDeConditionnement.getId() != null) {
            throw new BadRequestAlertException("A new typeDeConditionnement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeDeConditionnement result = typeDeConditionnementRepository.save(typeDeConditionnement);
        return ResponseEntity.created(new URI("/api/type-de-conditionnements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /type-de-conditionnements : Updates an existing typeDeConditionnement.
     *
     * @param typeDeConditionnement the typeDeConditionnement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated typeDeConditionnement,
     * or with status 400 (Bad Request) if the typeDeConditionnement is not valid,
     * or with status 500 (Internal Server Error) if the typeDeConditionnement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/type-de-conditionnements")
    @Timed
    public ResponseEntity<TypeDeConditionnement> updateTypeDeConditionnement(@RequestBody TypeDeConditionnement typeDeConditionnement) throws URISyntaxException {
        log.debug("REST request to update TypeDeConditionnement : {}", typeDeConditionnement);
        if (typeDeConditionnement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TypeDeConditionnement result = typeDeConditionnementRepository.save(typeDeConditionnement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, typeDeConditionnement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /type-de-conditionnements : get all the typeDeConditionnements.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of typeDeConditionnements in body
     */
    @GetMapping("/type-de-conditionnements")
    @Timed
    public List<TypeDeConditionnement> getAllTypeDeConditionnements() {
        log.debug("REST request to get all TypeDeConditionnements");
        return typeDeConditionnementRepository.findAll();
    }

    /**
     * GET  /type-de-conditionnements/:id : get the "id" typeDeConditionnement.
     *
     * @param id the id of the typeDeConditionnement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the typeDeConditionnement, or with status 404 (Not Found)
     */
    @GetMapping("/type-de-conditionnements/{id}")
    @Timed
    public ResponseEntity<TypeDeConditionnement> getTypeDeConditionnement(@PathVariable Long id) {
        log.debug("REST request to get TypeDeConditionnement : {}", id);
        Optional<TypeDeConditionnement> typeDeConditionnement = typeDeConditionnementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeDeConditionnement);
    }

    /**
     * DELETE  /type-de-conditionnements/:id : delete the "id" typeDeConditionnement.
     *
     * @param id the id of the typeDeConditionnement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/type-de-conditionnements/{id}")
    @Timed
    public ResponseEntity<Void> deleteTypeDeConditionnement(@PathVariable Long id) {
        log.debug("REST request to delete TypeDeConditionnement : {}", id);

        typeDeConditionnementRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
