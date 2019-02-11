package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.ListeGroupeInvite;
import demochimie.repository.ListeGroupeInviteRepository;
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
 * Test class for the ListeGroupeInviteResource REST controller.
 *
 * @see ListeGroupeInviteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class ListeGroupeInviteResourceIntTest {

    private static final String DEFAULT_NOM_GROUPE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_GROUPE = "BBBBBBBBBB";

    @Autowired
    private ListeGroupeInviteRepository listeGroupeInviteRepository;

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

    private MockMvc restListeGroupeInviteMockMvc;

    private ListeGroupeInvite listeGroupeInvite;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ListeGroupeInviteResource listeGroupeInviteResource = new ListeGroupeInviteResource(listeGroupeInviteRepository);
        this.restListeGroupeInviteMockMvc = MockMvcBuilders.standaloneSetup(listeGroupeInviteResource)
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
    public static ListeGroupeInvite createEntity(EntityManager em) {
        ListeGroupeInvite listeGroupeInvite = new ListeGroupeInvite()
            .nomGroupe(DEFAULT_NOM_GROUPE);
        return listeGroupeInvite;
    }

    @Before
    public void initTest() {
        listeGroupeInvite = createEntity(em);
    }

    @Test
    @Transactional
    public void createListeGroupeInvite() throws Exception {
        int databaseSizeBeforeCreate = listeGroupeInviteRepository.findAll().size();

        // Create the ListeGroupeInvite
        restListeGroupeInviteMockMvc.perform(post("/api/liste-groupe-invites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listeGroupeInvite)))
            .andExpect(status().isCreated());

        // Validate the ListeGroupeInvite in the database
        List<ListeGroupeInvite> listeGroupeInviteList = listeGroupeInviteRepository.findAll();
        assertThat(listeGroupeInviteList).hasSize(databaseSizeBeforeCreate + 1);
        ListeGroupeInvite testListeGroupeInvite = listeGroupeInviteList.get(listeGroupeInviteList.size() - 1);
        assertThat(testListeGroupeInvite.getNomGroupe()).isEqualTo(DEFAULT_NOM_GROUPE);
    }

    @Test
    @Transactional
    public void createListeGroupeInviteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = listeGroupeInviteRepository.findAll().size();

        // Create the ListeGroupeInvite with an existing ID
        listeGroupeInvite.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restListeGroupeInviteMockMvc.perform(post("/api/liste-groupe-invites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listeGroupeInvite)))
            .andExpect(status().isBadRequest());

        // Validate the ListeGroupeInvite in the database
        List<ListeGroupeInvite> listeGroupeInviteList = listeGroupeInviteRepository.findAll();
        assertThat(listeGroupeInviteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllListeGroupeInvites() throws Exception {
        // Initialize the database
        listeGroupeInviteRepository.saveAndFlush(listeGroupeInvite);

        // Get all the listeGroupeInviteList
        restListeGroupeInviteMockMvc.perform(get("/api/liste-groupe-invites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(listeGroupeInvite.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomGroupe").value(hasItem(DEFAULT_NOM_GROUPE.toString())));
    }
    
    @Test
    @Transactional
    public void getListeGroupeInvite() throws Exception {
        // Initialize the database
        listeGroupeInviteRepository.saveAndFlush(listeGroupeInvite);

        // Get the listeGroupeInvite
        restListeGroupeInviteMockMvc.perform(get("/api/liste-groupe-invites/{id}", listeGroupeInvite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(listeGroupeInvite.getId().intValue()))
            .andExpect(jsonPath("$.nomGroupe").value(DEFAULT_NOM_GROUPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingListeGroupeInvite() throws Exception {
        // Get the listeGroupeInvite
        restListeGroupeInviteMockMvc.perform(get("/api/liste-groupe-invites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateListeGroupeInvite() throws Exception {
        // Initialize the database
        listeGroupeInviteRepository.saveAndFlush(listeGroupeInvite);

        int databaseSizeBeforeUpdate = listeGroupeInviteRepository.findAll().size();

        // Update the listeGroupeInvite
        ListeGroupeInvite updatedListeGroupeInvite = listeGroupeInviteRepository.findById(listeGroupeInvite.getId()).get();
        // Disconnect from session so that the updates on updatedListeGroupeInvite are not directly saved in db
        em.detach(updatedListeGroupeInvite);
        updatedListeGroupeInvite
            .nomGroupe(UPDATED_NOM_GROUPE);

        restListeGroupeInviteMockMvc.perform(put("/api/liste-groupe-invites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedListeGroupeInvite)))
            .andExpect(status().isOk());

        // Validate the ListeGroupeInvite in the database
        List<ListeGroupeInvite> listeGroupeInviteList = listeGroupeInviteRepository.findAll();
        assertThat(listeGroupeInviteList).hasSize(databaseSizeBeforeUpdate);
        ListeGroupeInvite testListeGroupeInvite = listeGroupeInviteList.get(listeGroupeInviteList.size() - 1);
        assertThat(testListeGroupeInvite.getNomGroupe()).isEqualTo(UPDATED_NOM_GROUPE);
    }

    @Test
    @Transactional
    public void updateNonExistingListeGroupeInvite() throws Exception {
        int databaseSizeBeforeUpdate = listeGroupeInviteRepository.findAll().size();

        // Create the ListeGroupeInvite

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListeGroupeInviteMockMvc.perform(put("/api/liste-groupe-invites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listeGroupeInvite)))
            .andExpect(status().isBadRequest());

        // Validate the ListeGroupeInvite in the database
        List<ListeGroupeInvite> listeGroupeInviteList = listeGroupeInviteRepository.findAll();
        assertThat(listeGroupeInviteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteListeGroupeInvite() throws Exception {
        // Initialize the database
        listeGroupeInviteRepository.saveAndFlush(listeGroupeInvite);

        int databaseSizeBeforeDelete = listeGroupeInviteRepository.findAll().size();

        // Get the listeGroupeInvite
        restListeGroupeInviteMockMvc.perform(delete("/api/liste-groupe-invites/{id}", listeGroupeInvite.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ListeGroupeInvite> listeGroupeInviteList = listeGroupeInviteRepository.findAll();
        assertThat(listeGroupeInviteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListeGroupeInvite.class);
        ListeGroupeInvite listeGroupeInvite1 = new ListeGroupeInvite();
        listeGroupeInvite1.setId(1L);
        ListeGroupeInvite listeGroupeInvite2 = new ListeGroupeInvite();
        listeGroupeInvite2.setId(listeGroupeInvite1.getId());
        assertThat(listeGroupeInvite1).isEqualTo(listeGroupeInvite2);
        listeGroupeInvite2.setId(2L);
        assertThat(listeGroupeInvite1).isNotEqualTo(listeGroupeInvite2);
        listeGroupeInvite1.setId(null);
        assertThat(listeGroupeInvite1).isNotEqualTo(listeGroupeInvite2);
    }
}
