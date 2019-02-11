package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.DroitDacceeProduit;
import demochimie.repository.DroitDacceeProduitRepository;
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
 * Test class for the DroitDacceeProduitResource REST controller.
 *
 * @see DroitDacceeProduitResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class DroitDacceeProduitResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_NOM_GROUPE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_GROUPE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ETAT_DROIT = false;
    private static final Boolean UPDATED_ETAT_DROIT = true;

    @Autowired
    private DroitDacceeProduitRepository droitDacceeProduitRepository;

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

    private MockMvc restDroitDacceeProduitMockMvc;

    private DroitDacceeProduit droitDacceeProduit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DroitDacceeProduitResource droitDacceeProduitResource = new DroitDacceeProduitResource(droitDacceeProduitRepository);
        this.restDroitDacceeProduitMockMvc = MockMvcBuilders.standaloneSetup(droitDacceeProduitResource)
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
    public static DroitDacceeProduit createEntity(EntityManager em) {
        DroitDacceeProduit droitDacceeProduit = new DroitDacceeProduit()
            .nom(DEFAULT_NOM)
            .nomGroupe(DEFAULT_NOM_GROUPE)
            .etatDroit(DEFAULT_ETAT_DROIT);
        return droitDacceeProduit;
    }

    @Before
    public void initTest() {
        droitDacceeProduit = createEntity(em);
    }

    @Test
    @Transactional
    public void createDroitDacceeProduit() throws Exception {
        int databaseSizeBeforeCreate = droitDacceeProduitRepository.findAll().size();

        // Create the DroitDacceeProduit
        restDroitDacceeProduitMockMvc.perform(post("/api/droit-daccee-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(droitDacceeProduit)))
            .andExpect(status().isCreated());

        // Validate the DroitDacceeProduit in the database
        List<DroitDacceeProduit> droitDacceeProduitList = droitDacceeProduitRepository.findAll();
        assertThat(droitDacceeProduitList).hasSize(databaseSizeBeforeCreate + 1);
        DroitDacceeProduit testDroitDacceeProduit = droitDacceeProduitList.get(droitDacceeProduitList.size() - 1);
        assertThat(testDroitDacceeProduit.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testDroitDacceeProduit.getNomGroupe()).isEqualTo(DEFAULT_NOM_GROUPE);
        assertThat(testDroitDacceeProduit.isEtatDroit()).isEqualTo(DEFAULT_ETAT_DROIT);
    }

    @Test
    @Transactional
    public void createDroitDacceeProduitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = droitDacceeProduitRepository.findAll().size();

        // Create the DroitDacceeProduit with an existing ID
        droitDacceeProduit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDroitDacceeProduitMockMvc.perform(post("/api/droit-daccee-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(droitDacceeProduit)))
            .andExpect(status().isBadRequest());

        // Validate the DroitDacceeProduit in the database
        List<DroitDacceeProduit> droitDacceeProduitList = droitDacceeProduitRepository.findAll();
        assertThat(droitDacceeProduitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDroitDacceeProduits() throws Exception {
        // Initialize the database
        droitDacceeProduitRepository.saveAndFlush(droitDacceeProduit);

        // Get all the droitDacceeProduitList
        restDroitDacceeProduitMockMvc.perform(get("/api/droit-daccee-produits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(droitDacceeProduit.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].nomGroupe").value(hasItem(DEFAULT_NOM_GROUPE.toString())))
            .andExpect(jsonPath("$.[*].etatDroit").value(hasItem(DEFAULT_ETAT_DROIT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getDroitDacceeProduit() throws Exception {
        // Initialize the database
        droitDacceeProduitRepository.saveAndFlush(droitDacceeProduit);

        // Get the droitDacceeProduit
        restDroitDacceeProduitMockMvc.perform(get("/api/droit-daccee-produits/{id}", droitDacceeProduit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(droitDacceeProduit.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.nomGroupe").value(DEFAULT_NOM_GROUPE.toString()))
            .andExpect(jsonPath("$.etatDroit").value(DEFAULT_ETAT_DROIT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDroitDacceeProduit() throws Exception {
        // Get the droitDacceeProduit
        restDroitDacceeProduitMockMvc.perform(get("/api/droit-daccee-produits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDroitDacceeProduit() throws Exception {
        // Initialize the database
        droitDacceeProduitRepository.saveAndFlush(droitDacceeProduit);

        int databaseSizeBeforeUpdate = droitDacceeProduitRepository.findAll().size();

        // Update the droitDacceeProduit
        DroitDacceeProduit updatedDroitDacceeProduit = droitDacceeProduitRepository.findById(droitDacceeProduit.getId()).get();
        // Disconnect from session so that the updates on updatedDroitDacceeProduit are not directly saved in db
        em.detach(updatedDroitDacceeProduit);
        updatedDroitDacceeProduit
            .nom(UPDATED_NOM)
            .nomGroupe(UPDATED_NOM_GROUPE)
            .etatDroit(UPDATED_ETAT_DROIT);

        restDroitDacceeProduitMockMvc.perform(put("/api/droit-daccee-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDroitDacceeProduit)))
            .andExpect(status().isOk());

        // Validate the DroitDacceeProduit in the database
        List<DroitDacceeProduit> droitDacceeProduitList = droitDacceeProduitRepository.findAll();
        assertThat(droitDacceeProduitList).hasSize(databaseSizeBeforeUpdate);
        DroitDacceeProduit testDroitDacceeProduit = droitDacceeProduitList.get(droitDacceeProduitList.size() - 1);
        assertThat(testDroitDacceeProduit.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testDroitDacceeProduit.getNomGroupe()).isEqualTo(UPDATED_NOM_GROUPE);
        assertThat(testDroitDacceeProduit.isEtatDroit()).isEqualTo(UPDATED_ETAT_DROIT);
    }

    @Test
    @Transactional
    public void updateNonExistingDroitDacceeProduit() throws Exception {
        int databaseSizeBeforeUpdate = droitDacceeProduitRepository.findAll().size();

        // Create the DroitDacceeProduit

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDroitDacceeProduitMockMvc.perform(put("/api/droit-daccee-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(droitDacceeProduit)))
            .andExpect(status().isBadRequest());

        // Validate the DroitDacceeProduit in the database
        List<DroitDacceeProduit> droitDacceeProduitList = droitDacceeProduitRepository.findAll();
        assertThat(droitDacceeProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDroitDacceeProduit() throws Exception {
        // Initialize the database
        droitDacceeProduitRepository.saveAndFlush(droitDacceeProduit);

        int databaseSizeBeforeDelete = droitDacceeProduitRepository.findAll().size();

        // Get the droitDacceeProduit
        restDroitDacceeProduitMockMvc.perform(delete("/api/droit-daccee-produits/{id}", droitDacceeProduit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DroitDacceeProduit> droitDacceeProduitList = droitDacceeProduitRepository.findAll();
        assertThat(droitDacceeProduitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DroitDacceeProduit.class);
        DroitDacceeProduit droitDacceeProduit1 = new DroitDacceeProduit();
        droitDacceeProduit1.setId(1L);
        DroitDacceeProduit droitDacceeProduit2 = new DroitDacceeProduit();
        droitDacceeProduit2.setId(droitDacceeProduit1.getId());
        assertThat(droitDacceeProduit1).isEqualTo(droitDacceeProduit2);
        droitDacceeProduit2.setId(2L);
        assertThat(droitDacceeProduit1).isNotEqualTo(droitDacceeProduit2);
        droitDacceeProduit1.setId(null);
        assertThat(droitDacceeProduit1).isNotEqualTo(droitDacceeProduit2);
    }
}
