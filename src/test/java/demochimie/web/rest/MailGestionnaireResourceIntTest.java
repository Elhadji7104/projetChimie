package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.MailGestionnaire;
import demochimie.repository.MailGestionnaireRepository;
import demochimie.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static demochimie.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MailGestionnaireResource REST controller.
 *
 * @see MailGestionnaireResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class MailGestionnaireResourceIntTest {

    private static final String DEFAULT_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_MAIL = "BBBBBBBBBB";

    @Autowired
    private MailGestionnaireRepository mailGestionnaireRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMailGestionnaireMockMvc;

    private MailGestionnaire mailGestionnaire;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MailGestionnaireResource mailGestionnaireResource = new MailGestionnaireResource(mailGestionnaireRepository);
        this.restMailGestionnaireMockMvc = MockMvcBuilders.standaloneSetup(mailGestionnaireResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MailGestionnaire createEntity(EntityManager em) {
        MailGestionnaire mailGestionnaire = new MailGestionnaire()
            .mail(DEFAULT_MAIL);
        return mailGestionnaire;
    }

    @Before
    public void initTest() {
        mailGestionnaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createMailGestionnaire() throws Exception {
        int databaseSizeBeforeCreate = mailGestionnaireRepository.findAll().size();

        // Create the MailGestionnaire
        restMailGestionnaireMockMvc.perform(post("/api/mail-gestionnaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailGestionnaire)))
            .andExpect(status().isCreated());

        // Validate the MailGestionnaire in the database
        List<MailGestionnaire> mailGestionnaireList = mailGestionnaireRepository.findAll();
        assertThat(mailGestionnaireList).hasSize(databaseSizeBeforeCreate + 1);
        MailGestionnaire testMailGestionnaire = mailGestionnaireList.get(mailGestionnaireList.size() - 1);
        assertThat(testMailGestionnaire.getMail()).isEqualTo(DEFAULT_MAIL);
    }

    @Test
    @Transactional
    public void createMailGestionnaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mailGestionnaireRepository.findAll().size();

        // Create the MailGestionnaire with an existing ID
        mailGestionnaire.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMailGestionnaireMockMvc.perform(post("/api/mail-gestionnaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailGestionnaire)))
            .andExpect(status().isBadRequest());

        // Validate the MailGestionnaire in the database
        List<MailGestionnaire> mailGestionnaireList = mailGestionnaireRepository.findAll();
        assertThat(mailGestionnaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMailGestionnaires() throws Exception {
        // Initialize the database
        mailGestionnaireRepository.saveAndFlush(mailGestionnaire);

        // Get all the mailGestionnaireList
        restMailGestionnaireMockMvc.perform(get("/api/mail-gestionnaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mailGestionnaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].mail").value(hasItem(DEFAULT_MAIL.toString())));
    }
    
    @Test
    @Transactional
    public void getMailGestionnaire() throws Exception {
        // Initialize the database
        mailGestionnaireRepository.saveAndFlush(mailGestionnaire);

        // Get the mailGestionnaire
        restMailGestionnaireMockMvc.perform(get("/api/mail-gestionnaires/{id}", mailGestionnaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mailGestionnaire.getId().intValue()))
            .andExpect(jsonPath("$.mail").value(DEFAULT_MAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMailGestionnaire() throws Exception {
        // Get the mailGestionnaire
        restMailGestionnaireMockMvc.perform(get("/api/mail-gestionnaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMailGestionnaire() throws Exception {
        // Initialize the database
        mailGestionnaireRepository.saveAndFlush(mailGestionnaire);

        int databaseSizeBeforeUpdate = mailGestionnaireRepository.findAll().size();

        // Update the mailGestionnaire
        MailGestionnaire updatedMailGestionnaire = mailGestionnaireRepository.findById(mailGestionnaire.getId()).get();
        // Disconnect from session so that the updates on updatedMailGestionnaire are not directly saved in db
        em.detach(updatedMailGestionnaire);
        updatedMailGestionnaire
            .mail(UPDATED_MAIL);

        restMailGestionnaireMockMvc.perform(put("/api/mail-gestionnaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMailGestionnaire)))
            .andExpect(status().isOk());

        // Validate the MailGestionnaire in the database
        List<MailGestionnaire> mailGestionnaireList = mailGestionnaireRepository.findAll();
        assertThat(mailGestionnaireList).hasSize(databaseSizeBeforeUpdate);
        MailGestionnaire testMailGestionnaire = mailGestionnaireList.get(mailGestionnaireList.size() - 1);
        assertThat(testMailGestionnaire.getMail()).isEqualTo(UPDATED_MAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingMailGestionnaire() throws Exception {
        int databaseSizeBeforeUpdate = mailGestionnaireRepository.findAll().size();

        // Create the MailGestionnaire

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMailGestionnaireMockMvc.perform(put("/api/mail-gestionnaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailGestionnaire)))
            .andExpect(status().isBadRequest());

        // Validate the MailGestionnaire in the database
        List<MailGestionnaire> mailGestionnaireList = mailGestionnaireRepository.findAll();
        assertThat(mailGestionnaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMailGestionnaire() throws Exception {
        // Initialize the database
        mailGestionnaireRepository.saveAndFlush(mailGestionnaire);

        int databaseSizeBeforeDelete = mailGestionnaireRepository.findAll().size();

        // Get the mailGestionnaire
        restMailGestionnaireMockMvc.perform(delete("/api/mail-gestionnaires/{id}", mailGestionnaire.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MailGestionnaire> mailGestionnaireList = mailGestionnaireRepository.findAll();
        assertThat(mailGestionnaireList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MailGestionnaire.class);
        MailGestionnaire mailGestionnaire1 = new MailGestionnaire();
        mailGestionnaire1.setId(1L);
        MailGestionnaire mailGestionnaire2 = new MailGestionnaire();
        mailGestionnaire2.setId(mailGestionnaire1.getId());
        assertThat(mailGestionnaire1).isEqualTo(mailGestionnaire2);
        mailGestionnaire2.setId(2L);
        assertThat(mailGestionnaire1).isNotEqualTo(mailGestionnaire2);
        mailGestionnaire1.setId(null);
        assertThat(mailGestionnaire1).isNotEqualTo(mailGestionnaire2);
    }
}
