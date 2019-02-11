package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.FicheEmpruntProduit;
import demochimie.repository.FicheEmpruntProduitRepository;
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
 * REST controller for managing FicheEmpruntProduit.
 */
@RestController
@RequestMapping("/api")
public class FicheEmpruntProduitResource {

    private final Logger log = LoggerFactory.getLogger(FicheEmpruntProduitResource.class);

    private static final String ENTITY_NAME = "ficheEmpruntProduit";

    private final FicheEmpruntProduitRepository ficheEmpruntProduitRepository;

    public FicheEmpruntProduitResource(FicheEmpruntProduitRepository ficheEmpruntProduitRepository) {
        this.ficheEmpruntProduitRepository = ficheEmpruntProduitRepository;
    }

    /**
     * POST  /fiche-emprunt-produits : Create a new ficheEmpruntProduit.
     *
     * @param ficheEmpruntProduit the ficheEmpruntProduit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ficheEmpruntProduit, or with status 400 (Bad Request) if the ficheEmpruntProduit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fiche-emprunt-produits")
    @Timed
    public ResponseEntity<FicheEmpruntProduit> createFicheEmpruntProduit(@RequestBody FicheEmpruntProduit ficheEmpruntProduit) throws URISyntaxException {
        log.debug("REST request to save FicheEmpruntProduit : {}", ficheEmpruntProduit);
        if (ficheEmpruntProduit.getId() != null) {
            throw new BadRequestAlertException("A new ficheEmpruntProduit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FicheEmpruntProduit result = ficheEmpruntProduitRepository.save(ficheEmpruntProduit);
        return ResponseEntity.created(new URI("/api/fiche-emprunt-produits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fiche-emprunt-produits : Updates an existing ficheEmpruntProduit.
     *
     * @param ficheEmpruntProduit the ficheEmpruntProduit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ficheEmpruntProduit,
     * or with status 400 (Bad Request) if the ficheEmpruntProduit is not valid,
     * or with status 500 (Internal Server Error) if the ficheEmpruntProduit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fiche-emprunt-produits")
    @Timed
    public ResponseEntity<FicheEmpruntProduit> updateFicheEmpruntProduit(@RequestBody FicheEmpruntProduit ficheEmpruntProduit) throws URISyntaxException {
        log.debug("REST request to update FicheEmpruntProduit : {}", ficheEmpruntProduit);
        if (ficheEmpruntProduit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FicheEmpruntProduit result = ficheEmpruntProduitRepository.save(ficheEmpruntProduit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ficheEmpruntProduit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fiche-emprunt-produits : get all the ficheEmpruntProduits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ficheEmpruntProduits in body
     */
    @GetMapping("/fiche-emprunt-produits")
    @Timed
    public List<FicheEmpruntProduit> getAllFicheEmpruntProduits() {
        log.debug("REST request to get all FicheEmpruntProduits");
        return ficheEmpruntProduitRepository.findAll();
    }

    /**
     * GET  /fiche-emprunt-produits/:id : get the "id" ficheEmpruntProduit.
     *
     * @param id the id of the ficheEmpruntProduit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ficheEmpruntProduit, or with status 404 (Not Found)
     */
    @GetMapping("/fiche-emprunt-produits/{id}")
    @Timed
    public ResponseEntity<FicheEmpruntProduit> getFicheEmpruntProduit(@PathVariable Long id) {
        log.debug("REST request to get FicheEmpruntProduit : {}", id);
        Optional<FicheEmpruntProduit> ficheEmpruntProduit = ficheEmpruntProduitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ficheEmpruntProduit);
    }

    /**
     * DELETE  /fiche-emprunt-produits/:id : delete the "id" ficheEmpruntProduit.
     *
     * @param id the id of the ficheEmpruntProduit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fiche-emprunt-produits/{id}")
    @Timed
    public ResponseEntity<Void> deleteFicheEmpruntProduit(@PathVariable Long id) {
        log.debug("REST request to delete FicheEmpruntProduit : {}", id);

        ficheEmpruntProduitRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
