package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.FicheDeCommandeProduit;
import demochimie.repository.FicheDeCommandeProduitRepository;
import demochimie.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;


import static demochimie.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FicheDeCommandeProduitResource REST controller.
 *
 * @see FicheDeCommandeProduitResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class FicheDeCommandeProduitResourceIntTest {

    private static final Float DEFAULT_QUANTITE = 1F;
    private static final Float UPDATED_QUANTITE = 2F;

    private static final LocalDate DEFAULT_DATE_DE_COMMANDE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DE_COMMANDE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_LIVRAISON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_LIVRAISON = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private FicheDeCommandeProduitRepository ficheDeCommandeProduitRepository;

    @Mock
    private FicheDeCommandeProduitRepository ficheDeCommandeProduitRepositoryMock;

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

    private MockMvc restFicheDeCommandeProduitMockMvc;

    private FicheDeCommandeProduit ficheDeCommandeProduit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FicheDeCommandeProduitResource ficheDeCommandeProduitResource = new FicheDeCommandeProduitResource(ficheDeCommandeProduitRepository);
        this.restFicheDeCommandeProduitMockMvc = MockMvcBuilders.standaloneSetup(ficheDeCommandeProduitResource)
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
    public static FicheDeCommandeProduit createEntity(EntityManager em) {
        FicheDeCommandeProduit ficheDeCommandeProduit = new FicheDeCommandeProduit()
            .quantite(DEFAULT_QUANTITE)
            .dateDeCommande(DEFAULT_DATE_DE_COMMANDE)
            .dateLivraison(DEFAULT_DATE_LIVRAISON);
        return ficheDeCommandeProduit;
    }

    @Before
    public void initTest() {
        ficheDeCommandeProduit = createEntity(em);
    }

    @Test
    @Transactional
    public void createFicheDeCommandeProduit() throws Exception {
        int databaseSizeBeforeCreate = ficheDeCommandeProduitRepository.findAll().size();

        // Create the FicheDeCommandeProduit
        restFicheDeCommandeProduitMockMvc.perform(post("/api/fiche-de-commande-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheDeCommandeProduit)))
            .andExpect(status().isCreated());

        // Validate the FicheDeCommandeProduit in the database
        List<FicheDeCommandeProduit> ficheDeCommandeProduitList = ficheDeCommandeProduitRepository.findAll();
        assertThat(ficheDeCommandeProduitList).hasSize(databaseSizeBeforeCreate + 1);
        FicheDeCommandeProduit testFicheDeCommandeProduit = ficheDeCommandeProduitList.get(ficheDeCommandeProduitList.size() - 1);
        assertThat(testFicheDeCommandeProduit.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testFicheDeCommandeProduit.getDateDeCommande()).isEqualTo(DEFAULT_DATE_DE_COMMANDE);
        assertThat(testFicheDeCommandeProduit.getDateLivraison()).isEqualTo(DEFAULT_DATE_LIVRAISON);
    }

    @Test
    @Transactional
    public void createFicheDeCommandeProduitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ficheDeCommandeProduitRepository.findAll().size();

        // Create the FicheDeCommandeProduit with an existing ID
        ficheDeCommandeProduit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFicheDeCommandeProduitMockMvc.perform(post("/api/fiche-de-commande-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheDeCommandeProduit)))
            .andExpect(status().isBadRequest());

        // Validate the FicheDeCommandeProduit in the database
        List<FicheDeCommandeProduit> ficheDeCommandeProduitList = ficheDeCommandeProduitRepository.findAll();
        assertThat(ficheDeCommandeProduitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFicheDeCommandeProduits() throws Exception {
        // Initialize the database
        ficheDeCommandeProduitRepository.saveAndFlush(ficheDeCommandeProduit);

        // Get all the ficheDeCommandeProduitList
        restFicheDeCommandeProduitMockMvc.perform(get("/api/fiche-de-commande-produits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ficheDeCommandeProduit.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE.doubleValue())))
            .andExpect(jsonPath("$.[*].dateDeCommande").value(hasItem(DEFAULT_DATE_DE_COMMANDE.toString())))
            .andExpect(jsonPath("$.[*].dateLivraison").value(hasItem(DEFAULT_DATE_LIVRAISON.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllFicheDeCommandeProduitsWithEagerRelationshipsIsEnabled() throws Exception {
        FicheDeCommandeProduitResource ficheDeCommandeProduitResource = new FicheDeCommandeProduitResource(ficheDeCommandeProduitRepositoryMock);
        when(ficheDeCommandeProduitRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restFicheDeCommandeProduitMockMvc = MockMvcBuilders.standaloneSetup(ficheDeCommandeProduitResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restFicheDeCommandeProduitMockMvc.perform(get("/api/fiche-de-commande-produits?eagerload=true"))
        .andExpect(status().isOk());

        verify(ficheDeCommandeProduitRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllFicheDeCommandeProduitsWithEagerRelationshipsIsNotEnabled() throws Exception {
        FicheDeCommandeProduitResource ficheDeCommandeProduitResource = new FicheDeCommandeProduitResource(ficheDeCommandeProduitRepositoryMock);
            when(ficheDeCommandeProduitRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restFicheDeCommandeProduitMockMvc = MockMvcBuilders.standaloneSetup(ficheDeCommandeProduitResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restFicheDeCommandeProduitMockMvc.perform(get("/api/fiche-de-commande-produits?eagerload=true"))
        .andExpect(status().isOk());

            verify(ficheDeCommandeProduitRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getFicheDeCommandeProduit() throws Exception {
        // Initialize the database
        ficheDeCommandeProduitRepository.saveAndFlush(ficheDeCommandeProduit);

        // Get the ficheDeCommandeProduit
        restFicheDeCommandeProduitMockMvc.perform(get("/api/fiche-de-commande-produits/{id}", ficheDeCommandeProduit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ficheDeCommandeProduit.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE.doubleValue()))
            .andExpect(jsonPath("$.dateDeCommande").value(DEFAULT_DATE_DE_COMMANDE.toString()))
            .andExpect(jsonPath("$.dateLivraison").value(DEFAULT_DATE_LIVRAISON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFicheDeCommandeProduit() throws Exception {
        // Get the ficheDeCommandeProduit
        restFicheDeCommandeProduitMockMvc.perform(get("/api/fiche-de-commande-produits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFicheDeCommandeProduit() throws Exception {
        // Initialize the database
        ficheDeCommandeProduitRepository.saveAndFlush(ficheDeCommandeProduit);

        int databaseSizeBeforeUpdate = ficheDeCommandeProduitRepository.findAll().size();

        // Update the ficheDeCommandeProduit
        FicheDeCommandeProduit updatedFicheDeCommandeProduit = ficheDeCommandeProduitRepository.findById(ficheDeCommandeProduit.getId()).get();
        // Disconnect from session so that the updates on updatedFicheDeCommandeProduit are not directly saved in db
        em.detach(updatedFicheDeCommandeProduit);
        updatedFicheDeCommandeProduit
            .quantite(UPDATED_QUANTITE)
            .dateDeCommande(UPDATED_DATE_DE_COMMANDE)
            .dateLivraison(UPDATED_DATE_LIVRAISON);

        restFicheDeCommandeProduitMockMvc.perform(put("/api/fiche-de-commande-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFicheDeCommandeProduit)))
            .andExpect(status().isOk());

        // Validate the FicheDeCommandeProduit in the database
        List<FicheDeCommandeProduit> ficheDeCommandeProduitList = ficheDeCommandeProduitRepository.findAll();
        assertThat(ficheDeCommandeProduitList).hasSize(databaseSizeBeforeUpdate);
        FicheDeCommandeProduit testFicheDeCommandeProduit = ficheDeCommandeProduitList.get(ficheDeCommandeProduitList.size() - 1);
        assertThat(testFicheDeCommandeProduit.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testFicheDeCommandeProduit.getDateDeCommande()).isEqualTo(UPDATED_DATE_DE_COMMANDE);
        assertThat(testFicheDeCommandeProduit.getDateLivraison()).isEqualTo(UPDATED_DATE_LIVRAISON);
    }

    @Test
    @Transactional
    public void updateNonExistingFicheDeCommandeProduit() throws Exception {
        int databaseSizeBeforeUpdate = ficheDeCommandeProduitRepository.findAll().size();

        // Create the FicheDeCommandeProduit

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFicheDeCommandeProduitMockMvc.perform(put("/api/fiche-de-commande-produits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheDeCommandeProduit)))
            .andExpect(status().isBadRequest());

        // Validate the FicheDeCommandeProduit in the database
        List<FicheDeCommandeProduit> ficheDeCommandeProduitList = ficheDeCommandeProduitRepository.findAll();
        assertThat(ficheDeCommandeProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFicheDeCommandeProduit() throws Exception {
        // Initialize the database
        ficheDeCommandeProduitRepository.saveAndFlush(ficheDeCommandeProduit);

        int databaseSizeBeforeDelete = ficheDeCommandeProduitRepository.findAll().size();

        // Get the ficheDeCommandeProduit
        restFicheDeCommandeProduitMockMvc.perform(delete("/api/fiche-de-commande-produits/{id}", ficheDeCommandeProduit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FicheDeCommandeProduit> ficheDeCommandeProduitList = ficheDeCommandeProduitRepository.findAll();
        assertThat(ficheDeCommandeProduitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FicheDeCommandeProduit.class);
        FicheDeCommandeProduit ficheDeCommandeProduit1 = new FicheDeCommandeProduit();
        ficheDeCommandeProduit1.setId(1L);
        FicheDeCommandeProduit ficheDeCommandeProduit2 = new FicheDeCommandeProduit();
        ficheDeCommandeProduit2.setId(ficheDeCommandeProduit1.getId());
        assertThat(ficheDeCommandeProduit1).isEqualTo(ficheDeCommandeProduit2);
        ficheDeCommandeProduit2.setId(2L);
        assertThat(ficheDeCommandeProduit1).isNotEqualTo(ficheDeCommandeProduit2);
        ficheDeCommandeProduit1.setId(null);
        assertThat(ficheDeCommandeProduit1).isNotEqualTo(ficheDeCommandeProduit2);
    }
}
