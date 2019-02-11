package demochimie.web.rest;

import com.codahale.metrics.annotation.Timed;
import demochimie.domain.MailGestionnaire;
import demochimie.repository.MailGestionnaireRepository;
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
 * REST controller for managing MailGestionnaire.
 */
@RestController
@RequestMapping("/api")
public class MailGestionnaireResource {

    private final Logger log = LoggerFactory.getLogger(MailGestionnaireResource.class);

    private static final String ENTITY_NAME = "mailGestionnaire";

    private final MailGestionnaireRepository mailGestionnaireRepository;

    public MailGestionnaireResource(MailGestionnaireRepository mailGestionnaireRepository) {
        this.mailGestionnaireRepository = mailGestionnaireRepository;
    }

    /**
     * POST  /mail-gestionnaires : Create a new mailGestionnaire.
     *
     * @param mailGestionnaire the mailGestionnaire to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mailGestionnaire, or with status 400 (Bad Request) if the mailGestionnaire has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mail-gestionnaires")
    @Timed
    public ResponseEntity<MailGestionnaire> createMailGestionnaire(@RequestBody MailGestionnaire mailGestionnaire) throws URISyntaxException {
        log.debug("REST request to save MailGestionnaire : {}", mailGestionnaire);
        if (mailGestionnaire.getId() != null) {
            throw new BadRequestAlertException("A new mailGestionnaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MailGestionnaire result = mailGestionnaireRepository.save(mailGestionnaire);
        return ResponseEntity.created(new URI("/api/mail-gestionnaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mail-gestionnaires : Updates an existing mailGestionnaire.
     *
     * @param mailGestionnaire the mailGestionnaire to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mailGestionnaire,
     * or with status 400 (Bad Request) if the mailGestionnaire is not valid,
     * or with status 500 (Internal Server Error) if the mailGestionnaire couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mail-gestionnaires")
    @Timed
    public ResponseEntity<MailGestionnaire> updateMailGestionnaire(@RequestBody MailGestionnaire mailGestionnaire) throws URISyntaxException {
        log.debug("REST request to update MailGestionnaire : {}", mailGestionnaire);
        if (mailGestionnaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MailGestionnaire result = mailGestionnaireRepository.save(mailGestionnaire);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mailGestionnaire.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mail-gestionnaires : get all the mailGestionnaires.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mailGestionnaires in body
     */
    @GetMapping("/mail-gestionnaires")
    @Timed
    public List<MailGestionnaire> getAllMailGestionnaires() {
        log.debug("REST request to get all MailGestionnaires");
        return mailGestionnaireRepository.findAll();
    }

    /**
     * GET  /mail-gestionnaires/:id : get the "id" mailGestionnaire.
     *
     * @param id the id of the mailGestionnaire to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mailGestionnaire, or with status 404 (Not Found)
     */
    @GetMapping("/mail-gestionnaires/{id}")
    @Timed
    public ResponseEntity<MailGestionnaire> getMailGestionnaire(@PathVariable Long id) {
        log.debug("REST request to get MailGestionnaire : {}", id);
        Optional<MailGestionnaire> mailGestionnaire = mailGestionnaireRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mailGestionnaire);
    }

    /**
     * DELETE  /mail-gestionnaires/:id : delete the "id" mailGestionnaire.
     *
     * @param id the id of the mailGestionnaire to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mail-gestionnaires/{id}")
    @Timed
    public ResponseEntity<Void> deleteMailGestionnaire(@PathVariable Long id) {
        log.debug("REST request to delete MailGestionnaire : {}", id);

        mailGestionnaireRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
