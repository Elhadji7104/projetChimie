package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.Unite;
import demochimie.repository.UniteRepository;
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
 * Test class for the UniteResource REST controller.
 *
 * @see UniteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class UniteResourceIntTest {

    private static final String DEFAULT_LIBELLE_UNITE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_UNITE = "BBBBBBBBBB";

    @Autowired
    private UniteRepository uniteRepository;

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

    private MockMvc restUniteMockMvc;

    private Unite unite;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UniteResource uniteResource = new UniteResource(uniteRepository);
        this.restUniteMockMvc = MockMvcBuilders.standaloneSetup(uniteResource)
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
    public static Unite createEntity(EntityManager em) {
        Unite unite = new Unite()
            .libelleUnite(DEFAULT_LIBELLE_UNITE);
        return unite;
    }

    @Before
    public void initTest() {
        unite = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnite() throws Exception {
        int databaseSizeBeforeCreate = uniteRepository.findAll().size();

        // Create the Unite
        restUniteMockMvc.perform(post("/api/unites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unite)))
            .andExpect(status().isCreated());

        // Validate the Unite in the database
        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeCreate + 1);
        Unite testUnite = uniteList.get(uniteList.size() - 1);
        assertThat(testUnite.getLibelleUnite()).isEqualTo(DEFAULT_LIBELLE_UNITE);
    }

    @Test
    @Transactional
    public void createUniteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = uniteRepository.findAll().size();

        // Create the Unite with an existing ID
        unite.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUniteMockMvc.perform(post("/api/unites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unite)))
            .andExpect(status().isBadRequest());

        // Validate the Unite in the database
        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUnites() throws Exception {
        // Initialize the database
        uniteRepository.saveAndFlush(unite);

        // Get all the uniteList
        restUniteMockMvc.perform(get("/api/unites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unite.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelleUnite").value(hasItem(DEFAULT_LIBELLE_UNITE.toString())));
    }
    
    @Test
    @Transactional
    public void getUnite() throws Exception {
        // Initialize the database
        uniteRepository.saveAndFlush(unite);

        // Get the unite
        restUniteMockMvc.perform(get("/api/unites/{id}", unite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(unite.getId().intValue()))
            .andExpect(jsonPath("$.libelleUnite").value(DEFAULT_LIBELLE_UNITE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUnite() throws Exception {
        // Get the unite
        restUniteMockMvc.perform(get("/api/unites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnite() throws Exception {
        // Initialize the database
        uniteRepository.saveAndFlush(unite);

        int databaseSizeBeforeUpdate = uniteRepository.findAll().size();

        // Update the unite
        Unite updatedUnite = uniteRepository.findById(unite.getId()).get();
        // Disconnect from session so that the updates on updatedUnite are not directly saved in db
        em.detach(updatedUnite);
        updatedUnite
            .libelleUnite(UPDATED_LIBELLE_UNITE);

        restUniteMockMvc.perform(put("/api/unites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUnite)))
            .andExpect(status().isOk());

        // Validate the Unite in the database
        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeUpdate);
        Unite testUnite = uniteList.get(uniteList.size() - 1);
        assertThat(testUnite.getLibelleUnite()).isEqualTo(UPDATED_LIBELLE_UNITE);
    }

    @Test
    @Transactional
    public void updateNonExistingUnite() throws Exception {
        int databaseSizeBeforeUpdate = uniteRepository.findAll().size();

        // Create the Unite

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUniteMockMvc.perform(put("/api/unites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unite)))
            .andExpect(status().isBadRequest());

        // Validate the Unite in the database
        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUnite() throws Exception {
        // Initialize the database
        uniteRepository.saveAndFlush(unite);

        int databaseSizeBeforeDelete = uniteRepository.findAll().size();

        // Get the unite
        restUniteMockMvc.perform(delete("/api/unites/{id}", unite.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Unite.class);
        Unite unite1 = new Unite();
        unite1.setId(1L);
        Unite unite2 = new Unite();
        unite2.setId(unite1.getId());
        assertThat(unite1).isEqualTo(unite2);
        unite2.setId(2L);
        assertThat(unite1).isNotEqualTo(unite2);
        unite1.setId(null);
        assertThat(unite1).isNotEqualTo(unite2);
    }
}
