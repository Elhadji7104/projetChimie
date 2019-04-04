package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.FicheEmpruntProduit;
import demochimie.repository.FicheEmpruntProduitRepository;
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
 * Test class for the FicheEmpruntProduitResource REST controller.
 *
 * @see FicheEmpruntProduitResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class FicheEmpruntProduitResourceIntTest {

    private static final Float DEFAULT_QUANTITE = 1F;
    private static final Float UPDATED_QUANTITE = 2F;

    private static final LocalDate DEFAULT_DATE_EMPRUNT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_EMPRUNT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private FicheEmpruntProduitRepository ficheEmpruntProduitRepository;

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

    private MockMvc restFicheEmpruntProduitMockMvc;

    private FicheEmpruntProduit ficheEmpruntProduit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FicheEmpruntProduitResource ficheEmpruntProduitResource = new FicheEmpruntProduitResource(ficheEmpruntProduitRepository);
        this.restFicheEmpruntProduitMockMvc = MockMvcBuilders.standaloneSetup(ficheEmpruntProduitResource)
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
    public static FicheEmpruntProduit createEntity(EntityManager em) {
        FicheEmpruntProduit ficheEmpruntProduit = new FicheEmpruntProduit()
            .quantite(DEFAULT_QUANTITE)
            .dateEmprunt(DEFAULT_DATE_EMPRUNT);
        return ficheEmpruntProduit;
    }

    @Before
    public void initTest() {
        ficheEmpruntProduit = createEntity(em);
    }

    @Test
    @Transactional
    public void createFicheEmpruntProduit() throws Exception {
        int databaseSizeBeforeCreate = ficheEmpruntProduitRepository.findAll().size();

        // Create the FicheEmpruntProduit
        restFicheEmpruntProduitMockMvc.perform(post("/api/fiche-emprunt-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheEmpruntProduit)))
            .andExpect(status().isCreated());

        // Validate the FicheEmpruntProduit in the database
        List<FicheEmpruntProduit> ficheEmpruntProduitList = ficheEmpruntProduitRepository.findAll();
        assertThat(ficheEmpruntProduitList).hasSize(databaseSizeBeforeCreate + 1);
        FicheEmpruntProduit testFicheEmpruntProduit = ficheEmpruntProduitList.get(ficheEmpruntProduitList.size() - 1);
        assertThat(testFicheEmpruntProduit.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testFicheEmpruntProduit.getDateEmprunt()).isEqualTo(DEFAULT_DATE_EMPRUNT);
    }

    @Test
    @Transactional
    public void createFicheEmpruntProduitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ficheEmpruntProduitRepository.findAll().size();

        // Create the FicheEmpruntProduit with an existing ID
        ficheEmpruntProduit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFicheEmpruntProduitMockMvc.perform(post("/api/fiche-emprunt-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheEmpruntProduit)))
            .andExpect(status().isBadRequest());

        // Validate the FicheEmpruntProduit in the database
        List<FicheEmpruntProduit> ficheEmpruntProduitList = ficheEmpruntProduitRepository.findAll();
        assertThat(ficheEmpruntProduitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFicheEmpruntProduits() throws Exception {
        // Initialize the database
        ficheEmpruntProduitRepository.saveAndFlush(ficheEmpruntProduit);

        // Get all the ficheEmpruntProduitList
        restFicheEmpruntProduitMockMvc.perform(get("/api/fiche-emprunt-produits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ficheEmpruntProduit.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE.doubleValue())))
            .andExpect(jsonPath("$.[*].dateEmprunt").value(hasItem(DEFAULT_DATE_EMPRUNT.toString())));
    }
    
    @Test
    @Transactional
    public void getFicheEmpruntProduit() throws Exception {
        // Initialize the database
        ficheEmpruntProduitRepository.saveAndFlush(ficheEmpruntProduit);

        // Get the ficheEmpruntProduit
        restFicheEmpruntProduitMockMvc.perform(get("/api/fiche-emprunt-produits/{id}", ficheEmpruntProduit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ficheEmpruntProduit.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE.doubleValue()))
            .andExpect(jsonPath("$.dateEmprunt").value(DEFAULT_DATE_EMPRUNT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFicheEmpruntProduit() throws Exception {
        // Get the ficheEmpruntProduit
        restFicheEmpruntProduitMockMvc.perform(get("/api/fiche-emprunt-produits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFicheEmpruntProduit() throws Exception {
        // Initialize the database
        ficheEmpruntProduitRepository.saveAndFlush(ficheEmpruntProduit);

        int databaseSizeBeforeUpdate = ficheEmpruntProduitRepository.findAll().size();

        // Update the ficheEmpruntProduit
        FicheEmpruntProduit updatedFicheEmpruntProduit = ficheEmpruntProduitRepository.findById(ficheEmpruntProduit.getId()).get();
        // Disconnect from session so that the updates on updatedFicheEmpruntProduit are not directly saved in db
        em.detach(updatedFicheEmpruntProduit);
        updatedFicheEmpruntProduit
            .quantite(UPDATED_QUANTITE)
            .dateEmprunt(UPDATED_DATE_EMPRUNT);

        restFicheEmpruntProduitMockMvc.perform(put("/api/fiche-emprunt-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFicheEmpruntProduit)))
            .andExpect(status().isOk());

        // Validate the FicheEmpruntProduit in the database
        List<FicheEmpruntProduit> ficheEmpruntProduitList = ficheEmpruntProduitRepository.findAll();
        assertThat(ficheEmpruntProduitList).hasSize(databaseSizeBeforeUpdate);
        FicheEmpruntProduit testFicheEmpruntProduit = ficheEmpruntProduitList.get(ficheEmpruntProduitList.size() - 1);
        assertThat(testFicheEmpruntProduit.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testFicheEmpruntProduit.getDateEmprunt()).isEqualTo(UPDATED_DATE_EMPRUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingFicheEmpruntProduit() throws Exception {
        int databaseSizeBeforeUpdate = ficheEmpruntProduitRepository.findAll().size();

        // Create the FicheEmpruntProduit

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFicheEmpruntProduitMockMvc.perform(put("/api/fiche-emprunt-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheEmpruntProduit)))
            .andExpect(status().isBadRequest());

        // Validate the FicheEmpruntProduit in the database
        List<FicheEmpruntProduit> ficheEmpruntProduitList = ficheEmpruntProduitRepository.findAll();
        assertThat(ficheEmpruntProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFicheEmpruntProduit() throws Exception {
        // Initialize the database
        ficheEmpruntProduitRepository.saveAndFlush(ficheEmpruntProduit);

        int databaseSizeBeforeDelete = ficheEmpruntProduitRepository.findAll().size();

        // Get the ficheEmpruntProduit
        restFicheEmpruntProduitMockMvc.perform(delete("/api/fiche-emprunt-produits/{id}", ficheEmpruntProduit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FicheEmpruntProduit> ficheEmpruntProduitList = ficheEmpruntProduitRepository.findAll();
        assertThat(ficheEmpruntProduitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FicheEmpruntProduit.class);
        FicheEmpruntProduit ficheEmpruntProduit1 = new FicheEmpruntProduit();
        ficheEmpruntProduit1.setId(1L);
        FicheEmpruntProduit ficheEmpruntProduit2 = new FicheEmpruntProduit();
        ficheEmpruntProduit2.setId(ficheEmpruntProduit1.getId());
        assertThat(ficheEmpruntProduit1).isEqualTo(ficheEmpruntProduit2);
        ficheEmpruntProduit2.setId(2L);
        assertThat(ficheEmpruntProduit1).isNotEqualTo(ficheEmpruntProduit2);
        ficheEmpruntProduit1.setId(null);
        assertThat(ficheEmpruntProduit1).isNotEqualTo(ficheEmpruntProduit2);
    }
}
