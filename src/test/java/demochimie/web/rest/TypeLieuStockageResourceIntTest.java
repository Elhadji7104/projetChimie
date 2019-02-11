package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.TypeLieuStockage;
import demochimie.repository.TypeLieuStockageRepository;
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
 * Test class for the TypeLieuStockageResource REST controller.
 *
 * @see TypeLieuStockageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class TypeLieuStockageResourceIntTest {

    private static final String DEFAULT_LIBELLE_LIEU = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_LIEU = "BBBBBBBBBB";

    private static final Float DEFAULT_TEMPERATURE = 1F;
    private static final Float UPDATED_TEMPERATURE = 2F;

    @Autowired
    private TypeLieuStockageRepository typeLieuStockageRepository;

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

    private MockMvc restTypeLieuStockageMockMvc;

    private TypeLieuStockage typeLieuStockage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TypeLieuStockageResource typeLieuStockageResource = new TypeLieuStockageResource(typeLieuStockageRepository);
        this.restTypeLieuStockageMockMvc = MockMvcBuilders.standaloneSetup(typeLieuStockageResource)
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
    public static TypeLieuStockage createEntity(EntityManager em) {
        TypeLieuStockage typeLieuStockage = new TypeLieuStockage()
            .libelleLieu(DEFAULT_LIBELLE_LIEU)
            .temperature(DEFAULT_TEMPERATURE);
        return typeLieuStockage;
    }

    @Before
    public void initTest() {
        typeLieuStockage = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeLieuStockage() throws Exception {
        int databaseSizeBeforeCreate = typeLieuStockageRepository.findAll().size();

        // Create the TypeLieuStockage
        restTypeLieuStockageMockMvc.perform(post("/api/type-lieu-stockages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeLieuStockage)))
            .andExpect(status().isCreated());

        // Validate the TypeLieuStockage in the database
        List<TypeLieuStockage> typeLieuStockageList = typeLieuStockageRepository.findAll();
        assertThat(typeLieuStockageList).hasSize(databaseSizeBeforeCreate + 1);
        TypeLieuStockage testTypeLieuStockage = typeLieuStockageList.get(typeLieuStockageList.size() - 1);
        assertThat(testTypeLieuStockage.getLibelleLieu()).isEqualTo(DEFAULT_LIBELLE_LIEU);
        assertThat(testTypeLieuStockage.getTemperature()).isEqualTo(DEFAULT_TEMPERATURE);
    }

    @Test
    @Transactional
    public void createTypeLieuStockageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeLieuStockageRepository.findAll().size();

        // Create the TypeLieuStockage with an existing ID
        typeLieuStockage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeLieuStockageMockMvc.perform(post("/api/type-lieu-stockages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeLieuStockage)))
            .andExpect(status().isBadRequest());

        // Validate the TypeLieuStockage in the database
        List<TypeLieuStockage> typeLieuStockageList = typeLieuStockageRepository.findAll();
        assertThat(typeLieuStockageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTypeLieuStockages() throws Exception {
        // Initialize the database
        typeLieuStockageRepository.saveAndFlush(typeLieuStockage);

        // Get all the typeLieuStockageList
        restTypeLieuStockageMockMvc.perform(get("/api/type-lieu-stockages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeLieuStockage.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelleLieu").value(hasItem(DEFAULT_LIBELLE_LIEU.toString())))
            .andExpect(jsonPath("$.[*].temperature").value(hasItem(DEFAULT_TEMPERATURE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getTypeLieuStockage() throws Exception {
        // Initialize the database
        typeLieuStockageRepository.saveAndFlush(typeLieuStockage);

        // Get the typeLieuStockage
        restTypeLieuStockageMockMvc.perform(get("/api/type-lieu-stockages/{id}", typeLieuStockage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typeLieuStockage.getId().intValue()))
            .andExpect(jsonPath("$.libelleLieu").value(DEFAULT_LIBELLE_LIEU.toString()))
            .andExpect(jsonPath("$.temperature").value(DEFAULT_TEMPERATURE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTypeLieuStockage() throws Exception {
        // Get the typeLieuStockage
        restTypeLieuStockageMockMvc.perform(get("/api/type-lieu-stockages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeLieuStockage() throws Exception {
        // Initialize the database
        typeLieuStockageRepository.saveAndFlush(typeLieuStockage);

        int databaseSizeBeforeUpdate = typeLieuStockageRepository.findAll().size();

        // Update the typeLieuStockage
        TypeLieuStockage updatedTypeLieuStockage = typeLieuStockageRepository.findById(typeLieuStockage.getId()).get();
        // Disconnect from session so that the updates on updatedTypeLieuStockage are not directly saved in db
        em.detach(updatedTypeLieuStockage);
        updatedTypeLieuStockage
            .libelleLieu(UPDATED_LIBELLE_LIEU)
            .temperature(UPDATED_TEMPERATURE);

        restTypeLieuStockageMockMvc.perform(put("/api/type-lieu-stockages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeLieuStockage)))
            .andExpect(status().isOk());

        // Validate the TypeLieuStockage in the database
        List<TypeLieuStockage> typeLieuStockageList = typeLieuStockageRepository.findAll();
        assertThat(typeLieuStockageList).hasSize(databaseSizeBeforeUpdate);
        TypeLieuStockage testTypeLieuStockage = typeLieuStockageList.get(typeLieuStockageList.size() - 1);
        assertThat(testTypeLieuStockage.getLibelleLieu()).isEqualTo(UPDATED_LIBELLE_LIEU);
        assertThat(testTypeLieuStockage.getTemperature()).isEqualTo(UPDATED_TEMPERATURE);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeLieuStockage() throws Exception {
        int databaseSizeBeforeUpdate = typeLieuStockageRepository.findAll().size();

        // Create the TypeLieuStockage

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeLieuStockageMockMvc.perform(put("/api/type-lieu-stockages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeLieuStockage)))
            .andExpect(status().isBadRequest());

        // Validate the TypeLieuStockage in the database
        List<TypeLieuStockage> typeLieuStockageList = typeLieuStockageRepository.findAll();
        assertThat(typeLieuStockageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTypeLieuStockage() throws Exception {
        // Initialize the database
        typeLieuStockageRepository.saveAndFlush(typeLieuStockage);

        int databaseSizeBeforeDelete = typeLieuStockageRepository.findAll().size();

        // Get the typeLieuStockage
        restTypeLieuStockageMockMvc.perform(delete("/api/type-lieu-stockages/{id}", typeLieuStockage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TypeLieuStockage> typeLieuStockageList = typeLieuStockageRepository.findAll();
        assertThat(typeLieuStockageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeLieuStockage.class);
        TypeLieuStockage typeLieuStockage1 = new TypeLieuStockage();
        typeLieuStockage1.setId(1L);
        TypeLieuStockage typeLieuStockage2 = new TypeLieuStockage();
        typeLieuStockage2.setId(typeLieuStockage1.getId());
        assertThat(typeLieuStockage1).isEqualTo(typeLieuStockage2);
        typeLieuStockage2.setId(2L);
        assertThat(typeLieuStockage1).isNotEqualTo(typeLieuStockage2);
        typeLieuStockage1.setId(null);
        assertThat(typeLieuStockage1).isNotEqualTo(typeLieuStockage2);
    }
}
