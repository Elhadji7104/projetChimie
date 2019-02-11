package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.ListeMotsCles;
import demochimie.repository.ListeMotsClesRepository;
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
 * Test class for the ListeMotsClesResource REST controller.
 *
 * @see ListeMotsClesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class ListeMotsClesResourceIntTest {

    private static final String DEFAULT_LIBELLE_MOT = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_MOT = "BBBBBBBBBB";

    @Autowired
    private ListeMotsClesRepository listeMotsClesRepository;

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

    private MockMvc restListeMotsClesMockMvc;

    private ListeMotsCles listeMotsCles;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ListeMotsClesResource listeMotsClesResource = new ListeMotsClesResource(listeMotsClesRepository);
        this.restListeMotsClesMockMvc = MockMvcBuilders.standaloneSetup(listeMotsClesResource)
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
    public static ListeMotsCles createEntity(EntityManager em) {
        ListeMotsCles listeMotsCles = new ListeMotsCles()
            .libelleMot(DEFAULT_LIBELLE_MOT);
        return listeMotsCles;
    }

    @Before
    public void initTest() {
        listeMotsCles = createEntity(em);
    }

    @Test
    @Transactional
    public void createListeMotsCles() throws Exception {
        int databaseSizeBeforeCreate = listeMotsClesRepository.findAll().size();

        // Create the ListeMotsCles
        restListeMotsClesMockMvc.perform(post("/api/liste-mots-cles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listeMotsCles)))
            .andExpect(status().isCreated());

        // Validate the ListeMotsCles in the database
        List<ListeMotsCles> listeMotsClesList = listeMotsClesRepository.findAll();
        assertThat(listeMotsClesList).hasSize(databaseSizeBeforeCreate + 1);
        ListeMotsCles testListeMotsCles = listeMotsClesList.get(listeMotsClesList.size() - 1);
        assertThat(testListeMotsCles.getLibelleMot()).isEqualTo(DEFAULT_LIBELLE_MOT);
    }

    @Test
    @Transactional
    public void createListeMotsClesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = listeMotsClesRepository.findAll().size();

        // Create the ListeMotsCles with an existing ID
        listeMotsCles.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restListeMotsClesMockMvc.perform(post("/api/liste-mots-cles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listeMotsCles)))
            .andExpect(status().isBadRequest());

        // Validate the ListeMotsCles in the database
        List<ListeMotsCles> listeMotsClesList = listeMotsClesRepository.findAll();
        assertThat(listeMotsClesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllListeMotsCles() throws Exception {
        // Initialize the database
        listeMotsClesRepository.saveAndFlush(listeMotsCles);

        // Get all the listeMotsClesList
        restListeMotsClesMockMvc.perform(get("/api/liste-mots-cles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(listeMotsCles.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelleMot").value(hasItem(DEFAULT_LIBELLE_MOT.toString())));
    }
    
    @Test
    @Transactional
    public void getListeMotsCles() throws Exception {
        // Initialize the database
        listeMotsClesRepository.saveAndFlush(listeMotsCles);

        // Get the listeMotsCles
        restListeMotsClesMockMvc.perform(get("/api/liste-mots-cles/{id}", listeMotsCles.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(listeMotsCles.getId().intValue()))
            .andExpect(jsonPath("$.libelleMot").value(DEFAULT_LIBELLE_MOT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingListeMotsCles() throws Exception {
        // Get the listeMotsCles
        restListeMotsClesMockMvc.perform(get("/api/liste-mots-cles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateListeMotsCles() throws Exception {
        // Initialize the database
        listeMotsClesRepository.saveAndFlush(listeMotsCles);

        int databaseSizeBeforeUpdate = listeMotsClesRepository.findAll().size();

        // Update the listeMotsCles
        ListeMotsCles updatedListeMotsCles = listeMotsClesRepository.findById(listeMotsCles.getId()).get();
        // Disconnect from session so that the updates on updatedListeMotsCles are not directly saved in db
        em.detach(updatedListeMotsCles);
        updatedListeMotsCles
            .libelleMot(UPDATED_LIBELLE_MOT);

        restListeMotsClesMockMvc.perform(put("/api/liste-mots-cles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedListeMotsCles)))
            .andExpect(status().isOk());

        // Validate the ListeMotsCles in the database
        List<ListeMotsCles> listeMotsClesList = listeMotsClesRepository.findAll();
        assertThat(listeMotsClesList).hasSize(databaseSizeBeforeUpdate);
        ListeMotsCles testListeMotsCles = listeMotsClesList.get(listeMotsClesList.size() - 1);
        assertThat(testListeMotsCles.getLibelleMot()).isEqualTo(UPDATED_LIBELLE_MOT);
    }

    @Test
    @Transactional
    public void updateNonExistingListeMotsCles() throws Exception {
        int databaseSizeBeforeUpdate = listeMotsClesRepository.findAll().size();

        // Create the ListeMotsCles

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListeMotsClesMockMvc.perform(put("/api/liste-mots-cles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listeMotsCles)))
            .andExpect(status().isBadRequest());

        // Validate the ListeMotsCles in the database
        List<ListeMotsCles> listeMotsClesList = listeMotsClesRepository.findAll();
        assertThat(listeMotsClesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteListeMotsCles() throws Exception {
        // Initialize the database
        listeMotsClesRepository.saveAndFlush(listeMotsCles);

        int databaseSizeBeforeDelete = listeMotsClesRepository.findAll().size();

        // Get the listeMotsCles
        restListeMotsClesMockMvc.perform(delete("/api/liste-mots-cles/{id}", listeMotsCles.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ListeMotsCles> listeMotsClesList = listeMotsClesRepository.findAll();
        assertThat(listeMotsClesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListeMotsCles.class);
        ListeMotsCles listeMotsCles1 = new ListeMotsCles();
        listeMotsCles1.setId(1L);
        ListeMotsCles listeMotsCles2 = new ListeMotsCles();
        listeMotsCles2.setId(listeMotsCles1.getId());
        assertThat(listeMotsCles1).isEqualTo(listeMotsCles2);
        listeMotsCles2.setId(2L);
        assertThat(listeMotsCles1).isNotEqualTo(listeMotsCles2);
        listeMotsCles1.setId(null);
        assertThat(listeMotsCles1).isNotEqualTo(listeMotsCles2);
    }
}
