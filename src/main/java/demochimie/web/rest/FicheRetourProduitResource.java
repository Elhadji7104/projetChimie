package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.FicheRetourProduit;
import demochimie.repository.FicheRetourProduitRepository;
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
 * REST controller for managing FicheRetourProduit.
 */
@RestController
@RequestMapping("/api")
public class FicheRetourProduitResource {

    private final Logger log = LoggerFactory.getLogger(FicheRetourProduitResource.class);

    private static final String ENTITY_NAME = "ficheRetourProduit";

    private final FicheRetourProduitRepository ficheRetourProduitRepository;

    public FicheRetourProduitResource(FicheRetourProduitRepository ficheRetourProduitRepository) {
        this.ficheRetourProduitRepository = ficheRetourProduitRepository;
    }

    /**
     * POST  /fiche-retour-produits : Create a new ficheRetourProduit.
     *
     * @param ficheRetourProduit the ficheRetourProduit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ficheRetourProduit, or with status 400 (Bad Request) if the ficheRetourProduit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fiche-retour-produits")
    @Timed
    public ResponseEntity<FicheRetourProduit> createFicheRetourProduit(@RequestBody FicheRetourProduit ficheRetourProduit) throws URISyntaxException {
        log.debug("REST request to save FicheRetourProduit : {}", ficheRetourProduit);
        if (ficheRetourProduit.getId() != null) {
            throw new BadRequestAlertException("A new ficheRetourProduit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FicheRetourProduit result = ficheRetourProduitRepository.save(ficheRetourProduit);
        return ResponseEntity.created(new URI("/api/fiche-retour-produits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fiche-retour-produits : Updates an existing ficheRetourProduit.
     *
     * @param ficheRetourProduit the ficheRetourProduit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ficheRetourProduit,
     * or with status 400 (Bad Request) if the ficheRetourProduit is not valid,
     * or with status 500 (Internal Server Error) if the ficheRetourProduit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fiche-retour-produits")
    @Timed
    public ResponseEntity<FicheRetourProduit> updateFicheRetourProduit(@RequestBody FicheRetourProduit ficheRetourProduit) throws URISyntaxException {
        log.debug("REST request to update FicheRetourProduit : {}", ficheRetourProduit);
        if (ficheRetourProduit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FicheRetourProduit result = ficheRetourProduitRepository.save(ficheRetourProduit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ficheRetourProduit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fiche-retour-produits : get all the ficheRetourProduits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ficheRetourProduits in body
     */
    @GetMapping("/fiche-retour-produits")
    @Timed
    public List<FicheRetourProduit> getAllFicheRetourProduits() {

        SecurityUtils secu = new SecurityUtils();
        String group = secu.CurrentGroupeUser();
        String authorite = secu.getCurrentUserJWTRole();
        if (authorite.equals("ROLE_ADMIN")) {
            log.debug("REST request to get all FicheRetourProduits");
            return ficheRetourProduitRepository.findAll();
        }
        if (authorite.equals("ROLE_USER")) {
            log.debug("REST request to get all FicheRetourProduits for Valideur and Base");
            return ficheRetourProduitRepository.findAllUser(secu.getCurrentUserLogin().get());
        }
        if (authorite.equals("ROLE_HYGIENE_ET_SECURITE")) {
            log.debug("REST request to get all FicheRetourProduits");
            return ficheRetourProduitRepository.findAll();
        }
        if (authorite.equals("ROLE_GESTIONNAIRE_DE_BASE")) {
            log.debug("REST request to get all FicheRetourProduits for Valideur and Base");
            return ficheRetourProduitRepository.findAllGroupe(group);
        }
        if (authorite.equals("ROLE_VALIDEUR")) {
            log.debug("REST request to get all FicheEmpruntProduits for Valideur and Base");
            return ficheRetourProduitRepository.findAllGroupe(group);
        }
        else{
            return null;
        }
    }

    /**
     * GET  /fiche-retour-produits/:id : get the "id" ficheRetourProduit.
     *
     * @param id the id of the ficheRetourProduit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ficheRetourProduit, or with status 404 (Not Found)
     */
    @GetMapping("/fiche-retour-produits/{id}")
    @Timed
    public ResponseEntity<FicheRetourProduit> getFicheRetourProduit(@PathVariable Long id) {
        log.debug("REST request to get FicheRetourProduit : {}", id);
        Optional<FicheRetourProduit> ficheRetourProduit = ficheRetourProduitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ficheRetourProduit);
    }

    /**
     * DELETE  /fiche-retour-produits/:id : delete the "id" ficheRetourProduit.
     *
     * @param id the id of the ficheRetourProduit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fiche-retour-produits/{id}")
    @Timed
    public ResponseEntity<Void> deleteFicheRetourProduit(@PathVariable Long id) {
        log.debug("REST request to delete FicheRetourProduit : {}", id);

        ficheRetourProduitRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
