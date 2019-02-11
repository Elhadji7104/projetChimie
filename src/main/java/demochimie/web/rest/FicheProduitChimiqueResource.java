package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.FicheProduitChimique;
import demochimie.repository.FicheProduitChimiqueRepository;
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
 * REST controller for managing FicheProduitChimique.
 */
@RestController
@RequestMapping("/api")
public class FicheProduitChimiqueResource {

    private final Logger log = LoggerFactory.getLogger(FicheProduitChimiqueResource.class);

    private static final String ENTITY_NAME = "ficheProduitChimique";

    private final FicheProduitChimiqueRepository ficheProduitChimiqueRepository;

    public FicheProduitChimiqueResource(FicheProduitChimiqueRepository ficheProduitChimiqueRepository) {
        this.ficheProduitChimiqueRepository = ficheProduitChimiqueRepository;
    }

    /**
     * POST  /fiche-produit-chimiques : Create a new ficheProduitChimique.
     *
     * @param ficheProduitChimique the ficheProduitChimique to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ficheProduitChimique, or with status 400 (Bad Request) if the ficheProduitChimique has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fiche-produit-chimiques")
    @Timed
    public ResponseEntity<FicheProduitChimique> createFicheProduitChimique(@RequestBody FicheProduitChimique ficheProduitChimique) throws URISyntaxException {
        log.debug("REST request to save FicheProduitChimique : {}", ficheProduitChimique);
        if (ficheProduitChimique.getId() != null) {
            throw new BadRequestAlertException("A new ficheProduitChimique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FicheProduitChimique result = ficheProduitChimiqueRepository.save(ficheProduitChimique);
        return ResponseEntity.created(new URI("/api/fiche-produit-chimiques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fiche-produit-chimiques : Updates an existing ficheProduitChimique.
     *
     * @param ficheProduitChimique the ficheProduitChimique to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ficheProduitChimique,
     * or with status 400 (Bad Request) if the ficheProduitChimique is not valid,
     * or with status 500 (Internal Server Error) if the ficheProduitChimique couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fiche-produit-chimiques")
    @Timed
    public ResponseEntity<FicheProduitChimique> updateFicheProduitChimique(@RequestBody FicheProduitChimique ficheProduitChimique) throws URISyntaxException {
        log.debug("REST request to update FicheProduitChimique : {}", ficheProduitChimique);
        if (ficheProduitChimique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FicheProduitChimique result = ficheProduitChimiqueRepository.save(ficheProduitChimique);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ficheProduitChimique.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fiche-produit-chimiques : get all the ficheProduitChimiques.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ficheProduitChimiques in body
     */
    @GetMapping("/fiche-produit-chimiques")
    @Timed
    public List<FicheProduitChimique> getAllFicheProduitChimiques() {
        log.debug("REST request to get all FicheProduitChimiques");
        return ficheProduitChimiqueRepository.findAll();
    }

    /**
     * GET  /fiche-produit-chimiques/:id : get the "id" ficheProduitChimique.
     *
     * @param id the id of the ficheProduitChimique to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ficheProduitChimique, or with status 404 (Not Found)
     */
    @GetMapping("/fiche-produit-chimiques/{id}")
    @Timed
    public ResponseEntity<FicheProduitChimique> getFicheProduitChimique(@PathVariable Long id) {
        log.debug("REST request to get FicheProduitChimique : {}", id);
        Optional<FicheProduitChimique> ficheProduitChimique = ficheProduitChimiqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ficheProduitChimique);
    }

    /**
     * DELETE  /fiche-produit-chimiques/:id : delete the "id" ficheProduitChimique.
     *
     * @param id the id of the ficheProduitChimique to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fiche-produit-chimiques/{id}")
    @Timed
    public ResponseEntity<Void> deleteFicheProduitChimique(@PathVariable Long id) {
        log.debug("REST request to delete FicheProduitChimique : {}", id);

        ficheProduitChimiqueRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
