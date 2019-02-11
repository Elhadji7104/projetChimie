package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.Classification;
import demochimie.repository.ClassificationRepository;
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
 * REST controller for managing Classification.
 */
@RestController
@RequestMapping("/api")
public class ClassificationResource {

    private final Logger log = LoggerFactory.getLogger(ClassificationResource.class);

    private static final String ENTITY_NAME = "classification";

    private final ClassificationRepository classificationRepository;

    public ClassificationResource(ClassificationRepository classificationRepository) {
        this.classificationRepository = classificationRepository;
    }

    /**
     * POST  /classifications : Create a new classification.
     *
     * @param classification the classification to create
     * @return the ResponseEntity with status 201 (Created) and with body the new classification, or with status 400 (Bad Request) if the classification has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/classifications")
    @Timed
    public ResponseEntity<Classification> createClassification(@RequestBody Classification classification) throws URISyntaxException {
        log.debug("REST request to save Classification : {}", classification);
        if (classification.getId() != null) {
            throw new BadRequestAlertException("A new classification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Classification result = classificationRepository.save(classification);
        return ResponseEntity.created(new URI("/api/classifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /classifications : Updates an existing classification.
     *
     * @param classification the classification to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated classification,
     * or with status 400 (Bad Request) if the classification is not valid,
     * or with status 500 (Internal Server Error) if the classification couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/classifications")
    @Timed
    public ResponseEntity<Classification> updateClassification(@RequestBody Classification classification) throws URISyntaxException {
        log.debug("REST request to update Classification : {}", classification);
        if (classification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Classification result = classificationRepository.save(classification);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, classification.getId().toString()))
            .body(result);
    }

    /**
     * GET  /classifications : get all the classifications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of classifications in body
     */
    @GetMapping("/classifications")
    @Timed
    public List<Classification> getAllClassifications() {
        log.debug("REST request to get all Classifications");
        return classificationRepository.findAll();
    }

    /**
     * GET  /classifications/:id : get the "id" classification.
     *
     * @param id the id of the classification to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the classification, or with status 404 (Not Found)
     */
    @GetMapping("/classifications/{id}")
    @Timed
    public ResponseEntity<Classification> getClassification(@PathVariable Long id) {
        log.debug("REST request to get Classification : {}", id);
        Optional<Classification> classification = classificationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(classification);
    }

    /**
     * DELETE  /classifications/:id : delete the "id" classification.
     *
     * @param id the id of the classification to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/classifications/{id}")
    @Timed
    public ResponseEntity<Void> deleteClassification(@PathVariable Long id) {
        log.debug("REST request to delete Classification : {}", id);

        classificationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
