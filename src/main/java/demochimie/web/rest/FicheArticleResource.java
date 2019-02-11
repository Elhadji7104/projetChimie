package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.FicheArticle;
import demochimie.repository.FicheArticleRepository;
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
 * REST controller for managing FicheArticle.
 */
@RestController
@RequestMapping("/api")
public class FicheArticleResource {

    private final Logger log = LoggerFactory.getLogger(FicheArticleResource.class);

    private static final String ENTITY_NAME = "ficheArticle";

    private final FicheArticleRepository ficheArticleRepository;

    public FicheArticleResource(FicheArticleRepository ficheArticleRepository) {
        this.ficheArticleRepository = ficheArticleRepository;
    }

    /**
     * POST  /fiche-articles : Create a new ficheArticle.
     *
     * @param ficheArticle the ficheArticle to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ficheArticle, or with status 400 (Bad Request) if the ficheArticle has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fiche-articles")
    @Timed
    public ResponseEntity<FicheArticle> createFicheArticle(@RequestBody FicheArticle ficheArticle) throws URISyntaxException {
        log.debug("REST request to save FicheArticle : {}", ficheArticle);
        if (ficheArticle.getId() != null) {
            throw new BadRequestAlertException("A new ficheArticle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FicheArticle result = ficheArticleRepository.save(ficheArticle);
        return ResponseEntity.created(new URI("/api/fiche-articles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fiche-articles : Updates an existing ficheArticle.
     *
     * @param ficheArticle the ficheArticle to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ficheArticle,
     * or with status 400 (Bad Request) if the ficheArticle is not valid,
     * or with status 500 (Internal Server Error) if the ficheArticle couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fiche-articles")
    @Timed
    public ResponseEntity<FicheArticle> updateFicheArticle(@RequestBody FicheArticle ficheArticle) throws URISyntaxException {
        log.debug("REST request to update FicheArticle : {}", ficheArticle);
        if (ficheArticle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FicheArticle result = ficheArticleRepository.save(ficheArticle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ficheArticle.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fiche-articles : get all the ficheArticles.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of ficheArticles in body
     */
    @GetMapping("/fiche-articles")
    @Timed
    public List<FicheArticle> getAllFicheArticles(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all FicheArticles");
        return ficheArticleRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /fiche-articles/:id : get the "id" ficheArticle.
     *
     * @param id the id of the ficheArticle to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ficheArticle, or with status 404 (Not Found)
     */
    @GetMapping("/fiche-articles/{id}")
    @Timed
    public ResponseEntity<FicheArticle> getFicheArticle(@PathVariable Long id) {
        log.debug("REST request to get FicheArticle : {}", id);
        Optional<FicheArticle> ficheArticle = ficheArticleRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(ficheArticle);
    }

    /**
     * DELETE  /fiche-articles/:id : delete the "id" ficheArticle.
     *
     * @param id the id of the ficheArticle to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fiche-articles/{id}")
    @Timed
    public ResponseEntity<Void> deleteFicheArticle(@PathVariable Long id) {
        log.debug("REST request to delete FicheArticle : {}", id);

        ficheArticleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
