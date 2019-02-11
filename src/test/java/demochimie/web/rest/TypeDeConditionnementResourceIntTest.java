package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.TypeDeConditionnement;
import demochimie.repository.TypeDeConditionnementRepository;
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
 * Test class for the TypeDeConditionnementResource REST controller.
 *
 * @see TypeDeConditionnementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class TypeDeConditionnementResourceIntTest {

    private static final String DEFAULT_LIBELLE_CONDITIONNEMENT = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_CONDITIONNEMENT = "BBBBBBBBBB";

    @Autowired
    private TypeDeConditionnementRepository typeDeConditionnementRepository;

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

    private MockMvc restTypeDeConditionnementMockMvc;

    private TypeDeConditionnement typeDeConditionnement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TypeDeConditionnementResource typeDeConditionnementResource = new TypeDeConditionnementResource(typeDeConditionnementRepository);
        this.restTypeDeConditionnementMockMvc = MockMvcBuilders.standaloneSetup(typeDeConditionnementResource)
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
    public static TypeDeConditionnement createEntity(EntityManager em) {
        TypeDeConditionnement typeDeConditionnement = new TypeDeConditionnement()
            .libelleConditionnement(DEFAULT_LIBELLE_CONDITIONNEMENT);
        return typeDeConditionnement;
    }

    @Before
    public void initTest() {
        typeDeConditionnement = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeDeConditionnement() throws Exception {
        int databaseSizeBeforeCreate = typeDeConditionnementRepository.findAll().size();

        // Create the TypeDeConditionnement
        restTypeDeConditionnementMockMvc.perform(post("/api/type-de-conditionnements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDeConditionnement)))
            .andExpect(status().isCreated());

        // Validate the TypeDeConditionnement in the database
        List<TypeDeConditionnement> typeDeConditionnementList = typeDeConditionnementRepository.findAll();
        assertThat(typeDeConditionnementList).hasSize(databaseSizeBeforeCreate + 1);
        TypeDeConditionnement testTypeDeConditionnement = typeDeConditionnementList.get(typeDeConditionnementList.size() - 1);
        assertThat(testTypeDeConditionnement.getLibelleConditionnement()).isEqualTo(DEFAULT_LIBELLE_CONDITIONNEMENT);
    }

    @Test
    @Transactional
    public void createTypeDeConditionnementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeDeConditionnementRepository.findAll().size();

        // Create the TypeDeConditionnement with an existing ID
        typeDeConditionnement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeDeConditionnementMockMvc.perform(post("/api/type-de-conditionnements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDeConditionnement)))
            .andExpect(status().isBadRequest());

        // Validate the TypeDeConditionnement in the database
        List<TypeDeConditionnement> typeDeConditionnementList = typeDeConditionnementRepository.findAll();
        assertThat(typeDeConditionnementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTypeDeConditionnements() throws Exception {
        // Initialize the database
        typeDeConditionnementRepository.saveAndFlush(typeDeConditionnement);

        // Get all the typeDeConditionnementList
        restTypeDeConditionnementMockMvc.perform(get("/api/type-de-conditionnements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeDeConditionnement.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelleConditionnement").value(hasItem(DEFAULT_LIBELLE_CONDITIONNEMENT.toString())));
    }
    
    @Test
    @Transactional
    public void getTypeDeConditionnement() throws Exception {
        // Initialize the database
        typeDeConditionnementRepository.saveAndFlush(typeDeConditionnement);

        // Get the typeDeConditionnement
        restTypeDeConditionnementMockMvc.perform(get("/api/type-de-conditionnements/{id}", typeDeConditionnement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typeDeConditionnement.getId().intValue()))
            .andExpect(jsonPath("$.libelleConditionnement").value(DEFAULT_LIBELLE_CONDITIONNEMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTypeDeConditionnement() throws Exception {
        // Get the typeDeConditionnement
        restTypeDeConditionnementMockMvc.perform(get("/api/type-de-conditionnements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeDeConditionnement() throws Exception {
        // Initialize the database
        typeDeConditionnementRepository.saveAndFlush(typeDeConditionnement);

        int databaseSizeBeforeUpdate = typeDeConditionnementRepository.findAll().size();

        // Update the typeDeConditionnement
        TypeDeConditionnement updatedTypeDeConditionnement = typeDeConditionnementRepository.findById(typeDeConditionnement.getId()).get();
        // Disconnect from session so that the updates on updatedTypeDeConditionnement are not directly saved in db
        em.detach(updatedTypeDeConditionnement);
        updatedTypeDeConditionnement
            .libelleConditionnement(UPDATED_LIBELLE_CONDITIONNEMENT);

        restTypeDeConditionnementMockMvc.perform(put("/api/type-de-conditionnements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeDeConditionnement)))
            .andExpect(status().isOk());

        // Validate the TypeDeConditionnement in the database
        List<TypeDeConditionnement> typeDeConditionnementList = typeDeConditionnementRepository.findAll();
        assertThat(typeDeConditionnementList).hasSize(databaseSizeBeforeUpdate);
        TypeDeConditionnement testTypeDeConditionnement = typeDeConditionnementList.get(typeDeConditionnementList.size() - 1);
        assertThat(testTypeDeConditionnement.getLibelleConditionnement()).isEqualTo(UPDATED_LIBELLE_CONDITIONNEMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeDeConditionnement() throws Exception {
        int databaseSizeBeforeUpdate = typeDeConditionnementRepository.findAll().size();

        // Create the TypeDeConditionnement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeDeConditionnementMockMvc.perform(put("/api/type-de-conditionnements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDeConditionnement)))
            .andExpect(status().isBadRequest());

        // Validate the TypeDeConditionnement in the database
        List<TypeDeConditionnement> typeDeConditionnementList = typeDeConditionnementRepository.findAll();
        assertThat(typeDeConditionnementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTypeDeConditionnement() throws Exception {
        // Initialize the database
        typeDeConditionnementRepository.saveAndFlush(typeDeConditionnement);

        int databaseSizeBeforeDelete = typeDeConditionnementRepository.findAll().size();

        // Get the typeDeConditionnement
        restTypeDeConditionnementMockMvc.perform(delete("/api/type-de-conditionnements/{id}", typeDeConditionnement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TypeDeConditionnement> typeDeConditionnementList = typeDeConditionnementRepository.findAll();
        assertThat(typeDeConditionnementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeDeConditionnement.class);
        TypeDeConditionnement typeDeConditionnement1 = new TypeDeConditionnement();
        typeDeConditionnement1.setId(1L);
        TypeDeConditionnement typeDeConditionnement2 = new TypeDeConditionnement();
        typeDeConditionnement2.setId(typeDeConditionnement1.getId());
        assertThat(typeDeConditionnement1).isEqualTo(typeDeConditionnement2);
        typeDeConditionnement2.setId(2L);
        assertThat(typeDeConditionnement1).isNotEqualTo(typeDeConditionnement2);
        typeDeConditionnement1.setId(null);
        assertThat(typeDeConditionnement1).isNotEqualTo(typeDeConditionnement2);
    }
}
