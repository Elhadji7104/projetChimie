package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.FicheRetourProduit;
import demochimie.repository.FicheRetourProduitRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static demochimie.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FicheRetourProduitResource REST controller.
 *
 * @see FicheRetourProduitResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class FicheRetourProduitResourceIntTest {

    private static final Float DEFAULT_QUANTITE = 1F;
    private static final Float UPDATED_QUANTITE = 2F;

    private static final LocalDate DEFAULT_DATE_RETOUR = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_RETOUR = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private FicheRetourProduitRepository ficheRetourProduitRepository;

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

    private MockMvc restFicheRetourProduitMockMvc;

    private FicheRetourProduit ficheRetourProduit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FicheRetourProduitResource ficheRetourProduitResource = new FicheRetourProduitResource(ficheRetourProduitRepository);
        this.restFicheRetourProduitMockMvc = MockMvcBuilders.standaloneSetup(ficheRetourProduitResource)
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
    public static FicheRetourProduit createEntity(EntityManager em) {
        FicheRetourProduit ficheRetourProduit = new FicheRetourProduit()
            .quantite(DEFAULT_QUANTITE)
            .dateRetour(DEFAULT_DATE_RETOUR);
        return ficheRetourProduit;
    }

    @Before
    public void initTest() {
        ficheRetourProduit = createEntity(em);
    }

    @Test
    @Transactional
    public void createFicheRetourProduit() throws Exception {
        int databaseSizeBeforeCreate = ficheRetourProduitRepository.findAll().size();

        // Create the FicheRetourProduit
        restFicheRetourProduitMockMvc.perform(post("/api/fiche-retour-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheRetourProduit)))
            .andExpect(status().isCreated());

        // Validate the FicheRetourProduit in the database
        List<FicheRetourProduit> ficheRetourProduitList = ficheRetourProduitRepository.findAll();
        assertThat(ficheRetourProduitList).hasSize(databaseSizeBeforeCreate + 1);
        FicheRetourProduit testFicheRetourProduit = ficheRetourProduitList.get(ficheRetourProduitList.size() - 1);
        assertThat(testFicheRetourProduit.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testFicheRetourProduit.getDateRetour()).isEqualTo(DEFAULT_DATE_RETOUR);
    }

    @Test
    @Transactional
    public void createFicheRetourProduitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ficheRetourProduitRepository.findAll().size();

        // Create the FicheRetourProduit with an existing ID
        ficheRetourProduit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFicheRetourProduitMockMvc.perform(post("/api/fiche-retour-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheRetourProduit)))
            .andExpect(status().isBadRequest());

        // Validate the FicheRetourProduit in the database
        List<FicheRetourProduit> ficheRetourProduitList = ficheRetourProduitRepository.findAll();
        assertThat(ficheRetourProduitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFicheRetourProduits() throws Exception {
        // Initialize the database
        ficheRetourProduitRepository.saveAndFlush(ficheRetourProduit);

        // Get all the ficheRetourProduitList
        restFicheRetourProduitMockMvc.perform(get("/api/fiche-retour-produits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ficheRetourProduit.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE.doubleValue())))
            .andExpect(jsonPath("$.[*].dateRetour").value(hasItem(DEFAULT_DATE_RETOUR.toString())));
    }
    
    @Test
    @Transactional
    public void getFicheRetourProduit() throws Exception {
        // Initialize the database
        ficheRetourProduitRepository.saveAndFlush(ficheRetourProduit);

        // Get the ficheRetourProduit
        restFicheRetourProduitMockMvc.perform(get("/api/fiche-retour-produits/{id}", ficheRetourProduit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ficheRetourProduit.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE.doubleValue()))
            .andExpect(jsonPath("$.dateRetour").value(DEFAULT_DATE_RETOUR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFicheRetourProduit() throws Exception {
        // Get the ficheRetourProduit
        restFicheRetourProduitMockMvc.perform(get("/api/fiche-retour-produits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFicheRetourProduit() throws Exception {
        // Initialize the database
        ficheRetourProduitRepository.saveAndFlush(ficheRetourProduit);

        int databaseSizeBeforeUpdate = ficheRetourProduitRepository.findAll().size();

        // Update the ficheRetourProduit
        FicheRetourProduit updatedFicheRetourProduit = ficheRetourProduitRepository.findById(ficheRetourProduit.getId()).get();
        // Disconnect from session so that the updates on updatedFicheRetourProduit are not directly saved in db
        em.detach(updatedFicheRetourProduit);
        updatedFicheRetourProduit
            .quantite(UPDATED_QUANTITE)
            .dateRetour(UPDATED_DATE_RETOUR);

        restFicheRetourProduitMockMvc.perform(put("/api/fiche-retour-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFicheRetourProduit)))
            .andExpect(status().isOk());

        // Validate the FicheRetourProduit in the database
        List<FicheRetourProduit> ficheRetourProduitList = ficheRetourProduitRepository.findAll();
        assertThat(ficheRetourProduitList).hasSize(databaseSizeBeforeUpdate);
        FicheRetourProduit testFicheRetourProduit = ficheRetourProduitList.get(ficheRetourProduitList.size() - 1);
        assertThat(testFicheRetourProduit.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testFicheRetourProduit.getDateRetour()).isEqualTo(UPDATED_DATE_RETOUR);
    }

    @Test
    @Transactional
    public void updateNonExistingFicheRetourProduit() throws Exception {
        int databaseSizeBeforeUpdate = ficheRetourProduitRepository.findAll().size();

        // Create the FicheRetourProduit

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFicheRetourProduitMockMvc.perform(put("/api/fiche-retour-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheRetourProduit)))
            .andExpect(status().isBadRequest());

        // Validate the FicheRetourProduit in the database
        List<FicheRetourProduit> ficheRetourProduitList = ficheRetourProduitRepository.findAll();
        assertThat(ficheRetourProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFicheRetourProduit() throws Exception {
        // Initialize the database
        ficheRetourProduitRepository.saveAndFlush(ficheRetourProduit);

        int databaseSizeBeforeDelete = ficheRetourProduitRepository.findAll().size();

        // Get the ficheRetourProduit
        restFicheRetourProduitMockMvc.perform(delete("/api/fiche-retour-produits/{id}", ficheRetourProduit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FicheRetourProduit> ficheRetourProduitList = ficheRetourProduitRepository.findAll();
        assertThat(ficheRetourProduitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FicheRetourProduit.class);
        FicheRetourProduit ficheRetourProduit1 = new FicheRetourProduit();
        ficheRetourProduit1.setId(1L);
        FicheRetourProduit ficheRetourProduit2 = new FicheRetourProduit();
        ficheRetourProduit2.setId(ficheRetourProduit1.getId());
        assertThat(ficheRetourProduit1).isEqualTo(ficheRetourProduit2);
        ficheRetourProduit2.setId(2L);
        assertThat(ficheRetourProduit1).isNotEqualTo(ficheRetourProduit2);
        ficheRetourProduit1.setId(null);
        assertThat(ficheRetourProduit1).isNotEqualTo(ficheRetourProduit2);
    }
}
