package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.FicheProduitChimique;
import demochimie.repository.FicheProduitChimiqueRepository;
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
 * Test class for the FicheProduitChimiqueResource REST controller.
 *
 * @see FicheProduitChimiqueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class FicheProduitChimiqueResourceIntTest {

    private static final String DEFAULT_CAS = "AAAAAAAAAA";
    private static final String UPDATED_CAS = "BBBBBBBBBB";

    private static final String DEFAULT_CODE_PRODUIT = "AAAAAAAAAA";
    private static final String UPDATED_CODE_PRODUIT = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_ACRONYME = "AAAAAAAAAA";
    private static final String UPDATED_ACRONYME = "BBBBBBBBBB";

    private static final String DEFAULT_MM = "AAAAAAAAAA";
    private static final String UPDATED_MM = "BBBBBBBBBB";

    private static final String DEFAULT_CODE_NACRE = "AAAAAAAAAA";
    private static final String UPDATED_CODE_NACRE = "BBBBBBBBBB";

    @Autowired
    private FicheProduitChimiqueRepository ficheProduitChimiqueRepository;

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

    private MockMvc restFicheProduitChimiqueMockMvc;

    private FicheProduitChimique ficheProduitChimique;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FicheProduitChimiqueResource ficheProduitChimiqueResource = new FicheProduitChimiqueResource(ficheProduitChimiqueRepository);
        this.restFicheProduitChimiqueMockMvc = MockMvcBuilders.standaloneSetup(ficheProduitChimiqueResource)
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
    public static FicheProduitChimique createEntity(EntityManager em) {
        FicheProduitChimique ficheProduitChimique = new FicheProduitChimique()
            .cas(DEFAULT_CAS)
            .codeProduit(DEFAULT_CODE_PRODUIT)
            .nom(DEFAULT_NOM)
            .acronyme(DEFAULT_ACRONYME)
            .mm(DEFAULT_MM)
            .codeNacre(DEFAULT_CODE_NACRE);
        return ficheProduitChimique;
    }

    @Before
    public void initTest() {
        ficheProduitChimique = createEntity(em);
    }

    @Test
    @Transactional
    public void createFicheProduitChimique() throws Exception {
        int databaseSizeBeforeCreate = ficheProduitChimiqueRepository.findAll().size();

        // Create the FicheProduitChimique
        restFicheProduitChimiqueMockMvc.perform(post("/api/fiche-produit-chimiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheProduitChimique)))
            .andExpect(status().isCreated());

        // Validate the FicheProduitChimique in the database
        List<FicheProduitChimique> ficheProduitChimiqueList = ficheProduitChimiqueRepository.findAll();
        assertThat(ficheProduitChimiqueList).hasSize(databaseSizeBeforeCreate + 1);
        FicheProduitChimique testFicheProduitChimique = ficheProduitChimiqueList.get(ficheProduitChimiqueList.size() - 1);
        assertThat(testFicheProduitChimique.getCas()).isEqualTo(DEFAULT_CAS);
        assertThat(testFicheProduitChimique.getCodeProduit()).isEqualTo(DEFAULT_CODE_PRODUIT);
        assertThat(testFicheProduitChimique.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testFicheProduitChimique.getAcronyme()).isEqualTo(DEFAULT_ACRONYME);
        assertThat(testFicheProduitChimique.getMm()).isEqualTo(DEFAULT_MM);
        assertThat(testFicheProduitChimique.getCodeNacre()).isEqualTo(DEFAULT_CODE_NACRE);
    }

    @Test
    @Transactional
    public void createFicheProduitChimiqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ficheProduitChimiqueRepository.findAll().size();

        // Create the FicheProduitChimique with an existing ID
        ficheProduitChimique.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFicheProduitChimiqueMockMvc.perform(post("/api/fiche-produit-chimiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheProduitChimique)))
            .andExpect(status().isBadRequest());

        // Validate the FicheProduitChimique in the database
        List<FicheProduitChimique> ficheProduitChimiqueList = ficheProduitChimiqueRepository.findAll();
        assertThat(ficheProduitChimiqueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFicheProduitChimiques() throws Exception {
        // Initialize the database
        ficheProduitChimiqueRepository.saveAndFlush(ficheProduitChimique);

        // Get all the ficheProduitChimiqueList
        restFicheProduitChimiqueMockMvc.perform(get("/api/fiche-produit-chimiques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ficheProduitChimique.getId().intValue())))
            .andExpect(jsonPath("$.[*].cas").value(hasItem(DEFAULT_CAS.toString())))
            .andExpect(jsonPath("$.[*].codeProduit").value(hasItem(DEFAULT_CODE_PRODUIT.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].acronyme").value(hasItem(DEFAULT_ACRONYME.toString())))
            .andExpect(jsonPath("$.[*].mm").value(hasItem(DEFAULT_MM.toString())))
            .andExpect(jsonPath("$.[*].codeNacre").value(hasItem(DEFAULT_CODE_NACRE.toString())));
    }
    
    @Test
    @Transactional
    public void getFicheProduitChimique() throws Exception {
        // Initialize the database
        ficheProduitChimiqueRepository.saveAndFlush(ficheProduitChimique);

        // Get the ficheProduitChimique
        restFicheProduitChimiqueMockMvc.perform(get("/api/fiche-produit-chimiques/{id}", ficheProduitChimique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ficheProduitChimique.getId().intValue()))
            .andExpect(jsonPath("$.cas").value(DEFAULT_CAS.toString()))
            .andExpect(jsonPath("$.codeProduit").value(DEFAULT_CODE_PRODUIT.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.acronyme").value(DEFAULT_ACRONYME.toString()))
            .andExpect(jsonPath("$.mm").value(DEFAULT_MM.toString()))
            .andExpect(jsonPath("$.codeNacre").value(DEFAULT_CODE_NACRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFicheProduitChimique() throws Exception {
        // Get the ficheProduitChimique
        restFicheProduitChimiqueMockMvc.perform(get("/api/fiche-produit-chimiques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFicheProduitChimique() throws Exception {
        // Initialize the database
        ficheProduitChimiqueRepository.saveAndFlush(ficheProduitChimique);

        int databaseSizeBeforeUpdate = ficheProduitChimiqueRepository.findAll().size();

        // Update the ficheProduitChimique
        FicheProduitChimique updatedFicheProduitChimique = ficheProduitChimiqueRepository.findById(ficheProduitChimique.getId()).get();
        // Disconnect from session so that the updates on updatedFicheProduitChimique are not directly saved in db
        em.detach(updatedFicheProduitChimique);
        updatedFicheProduitChimique
            .cas(UPDATED_CAS)
            .codeProduit(UPDATED_CODE_PRODUIT)
            .nom(UPDATED_NOM)
            .acronyme(UPDATED_ACRONYME)
            .mm(UPDATED_MM)
            .codeNacre(UPDATED_CODE_NACRE);

        restFicheProduitChimiqueMockMvc.perform(put("/api/fiche-produit-chimiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFicheProduitChimique)))
            .andExpect(status().isOk());

        // Validate the FicheProduitChimique in the database
        List<FicheProduitChimique> ficheProduitChimiqueList = ficheProduitChimiqueRepository.findAll();
        assertThat(ficheProduitChimiqueList).hasSize(databaseSizeBeforeUpdate);
        FicheProduitChimique testFicheProduitChimique = ficheProduitChimiqueList.get(ficheProduitChimiqueList.size() - 1);
        assertThat(testFicheProduitChimique.getCas()).isEqualTo(UPDATED_CAS);
        assertThat(testFicheProduitChimique.getCodeProduit()).isEqualTo(UPDATED_CODE_PRODUIT);
        assertThat(testFicheProduitChimique.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testFicheProduitChimique.getAcronyme()).isEqualTo(UPDATED_ACRONYME);
        assertThat(testFicheProduitChimique.getMm()).isEqualTo(UPDATED_MM);
        assertThat(testFicheProduitChimique.getCodeNacre()).isEqualTo(UPDATED_CODE_NACRE);
    }

    @Test
    @Transactional
    public void updateNonExistingFicheProduitChimique() throws Exception {
        int databaseSizeBeforeUpdate = ficheProduitChimiqueRepository.findAll().size();

        // Create the FicheProduitChimique

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFicheProduitChimiqueMockMvc.perform(put("/api/fiche-produit-chimiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheProduitChimique)))
            .andExpect(status().isBadRequest());

        // Validate the FicheProduitChimique in the database
        List<FicheProduitChimique> ficheProduitChimiqueList = ficheProduitChimiqueRepository.findAll();
        assertThat(ficheProduitChimiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFicheProduitChimique() throws Exception {
        // Initialize the database
        ficheProduitChimiqueRepository.saveAndFlush(ficheProduitChimique);

        int databaseSizeBeforeDelete = ficheProduitChimiqueRepository.findAll().size();

        // Get the ficheProduitChimique
        restFicheProduitChimiqueMockMvc.perform(delete("/api/fiche-produit-chimiques/{id}", ficheProduitChimique.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FicheProduitChimique> ficheProduitChimiqueList = ficheProduitChimiqueRepository.findAll();
        assertThat(ficheProduitChimiqueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FicheProduitChimique.class);
        FicheProduitChimique ficheProduitChimique1 = new FicheProduitChimique();
        ficheProduitChimique1.setId(1L);
        FicheProduitChimique ficheProduitChimique2 = new FicheProduitChimique();
        ficheProduitChimique2.setId(ficheProduitChimique1.getId());
        assertThat(ficheProduitChimique1).isEqualTo(ficheProduitChimique2);
        ficheProduitChimique2.setId(2L);
        assertThat(ficheProduitChimique1).isNotEqualTo(ficheProduitChimique2);
        ficheProduitChimique1.setId(null);
        assertThat(ficheProduitChimique1).isNotEqualTo(ficheProduitChimique2);
    }
}
