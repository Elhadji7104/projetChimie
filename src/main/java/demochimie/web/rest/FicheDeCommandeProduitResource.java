package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.FicheDeCommandeProduit;
import demochimie.repository.FicheDeCommandeProduitRepository;
import demochimie.security.SecurityUtils;
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
 * REST controller for managing FicheDeCommandeProduit.
 */
@RestController
@RequestMapping("/api")
public class FicheDeCommandeProduitResource {

    private final Logger log = LoggerFactory.getLogger(FicheDeCommandeProduitResource.class);

    private static final String ENTITY_NAME = "ficheDeCommandeProduit";

    private final FicheDeCommandeProduitRepository ficheDeCommandeProduitRepository;

    public FicheDeCommandeProduitResource(FicheDeCommandeProduitRepository ficheDeCommandeProduitRepository) {
        this.ficheDeCommandeProduitRepository = ficheDeCommandeProduitRepository;
    }

    /**
     * POST  /fiche-de-commande-produits : Create a new ficheDeCommandeProduit.
     *
     * @param ficheDeCommandeProduit the ficheDeCommandeProduit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ficheDeCommandeProduit, or with status 400 (Bad Request) if the ficheDeCommandeProduit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fiche-de-commande-produits")
    @Timed
    public ResponseEntity<FicheDeCommandeProduit> createFicheDeCommandeProduit(@RequestBody FicheDeCommandeProduit ficheDeCommandeProduit) throws URISyntaxException {
        log.debug("REST request to save FicheDeCommandeProduit : {}", ficheDeCommandeProduit);
        if (ficheDeCommandeProduit.getId() != null) {
            throw new BadRequestAlertException("A new ficheDeCommandeProduit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FicheDeCommandeProduit result = ficheDeCommandeProduitRepository.save(ficheDeCommandeProduit);
        return ResponseEntity.created(new URI("/api/fiche-de-commande-produits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fiche-de-commande-produits : Updates an existing ficheDeCommandeProduit.
     *
     * @param ficheDeCommandeProduit the ficheDeCommandeProduit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ficheDeCommandeProduit,
     * or with status 400 (Bad Request) if the ficheDeCommandeProduit is not valid,
     * or with status 500 (Internal Server Error) if the ficheDeCommandeProduit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fiche-de-commande-produits")
    @Timed
    public ResponseEntity<FicheDeCommandeProduit> updateFicheDeCommandeProduit(@RequestBody FicheDeCommandeProduit ficheDeCommandeProduit) throws URISyntaxException {
        log.debug("REST request to update FicheDeCommandeProduit : {}", ficheDeCommandeProduit);
        if (ficheDeCommandeProduit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FicheDeCommandeProduit result = ficheDeCommandeProduitRepository.save(ficheDeCommandeProduit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ficheDeCommandeProduit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fiche-de-commande-produits : get all the ficheDeCommandeProduits.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of ficheDeCommandeProduits in body
     */
    @GetMapping("/fiche-de-commande-produits")
    @Timed
    public List<FicheDeCommandeProduit> getAllFicheDeCommandeProduits(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {

        SecurityUtils secu = new SecurityUtils();
        String group = secu.CurrentGroupeUser();
        String authorite = secu.getCurrentUserJWTRole();
        if (authorite.equals("ROLE_ADMIN")) {
            log.debug("REST request to get all FicheDeCommandeProduits");
            return ficheDeCommandeProduitRepository.findAllWithEagerRelationships();
        }
        if (authorite.equals("ROLE_USER")) {
            log.debug("REST request to get all FicheDeCommandeProduits");
            return ficheDeCommandeProduitRepository.findAllWithEagerRelationships();
        }
        if (authorite.equals("ROLE_HYGIENE_ET_SECURITE")) {
            log.debug("REST request to get all FicheDeCommandeProduits");
            return ficheDeCommandeProduitRepository.findAllWithEagerRelationships();
        }
        if (authorite.equals("ROLE_GESTIONNAIRE_DE_BASE")) {
            log.debug("REST request to get all FicheDeCommandeProduits");
            return ficheDeCommandeProduitRepository.findAllWithEagerRelationships();
        }
        if (authorite.equals("ROLE_VALIDEUR")) {
            log.debug("REST request to get all FicheDeCommandeProduits");
            return ficheDeCommandeProduitRepository.findAllWithEagerRelationships();
        }
        else{
            return null;
        }


    }

    /**
     * GET  /fiche-de-commande-produits/:id : get the "id" ficheDeCommandeProduit.
     *
     * @param id the id of the ficheDeCommandeProduit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ficheDeCommandeProduit, or with status 404 (Not Found)
     */
    @GetMapping("/fiche-de-commande-produits/{id}")
    @Timed
    public ResponseEntity<FicheDeCommandeProduit> getFicheDeCommandeProduit(@PathVariable Long id) {
        log.debug("REST request to get FicheDeCommandeProduit : {}", id);
        Optional<FicheDeCommandeProduit> ficheDeCommandeProduit = ficheDeCommandeProduitRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(ficheDeCommandeProduit);
    }

    /**
     * DELETE  /fiche-de-commande-produits/:id : delete the "id" ficheDeCommandeProduit.
     *
     * @param id the id of the ficheDeCommandeProduit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fiche-de-commande-produits/{id}")
    @Timed
    public ResponseEntity<Void> deleteFicheDeCommandeProduit(@PathVariable Long id) {
        log.debug("REST request to delete FicheDeCommandeProduit : {}", id);

        ficheDeCommandeProduitRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
