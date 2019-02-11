package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.ListeCmr;
import demochimie.repository.ListeCmrRepository;
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
 * Test class for the ListeCmrResource REST controller.
 *
 * @see ListeCmrResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class ListeCmrResourceIntTest {

    private static final String DEFAULT_REF_LISTE = "AAAAAAAAAA";
    private static final String UPDATED_REF_LISTE = "BBBBBBBBBB";

    @Autowired
    private ListeCmrRepository listeCmrRepository;

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

    private MockMvc restListeCmrMockMvc;

    private ListeCmr listeCmr;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ListeCmrResource listeCmrResource = new ListeCmrResource(listeCmrRepository);
        this.restListeCmrMockMvc = MockMvcBuilders.standaloneSetup(listeCmrResource)
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
    public static ListeCmr createEntity(EntityManager em) {
        ListeCmr listeCmr = new ListeCmr()
            .refListe(DEFAULT_REF_LISTE);
        return listeCmr;
    }

    @Before
    public void initTest() {
        listeCmr = createEntity(em);
    }

    @Test
    @Transactional
    public void createListeCmr() throws Exception {
        int databaseSizeBeforeCreate = listeCmrRepository.findAll().size();

        // Create the ListeCmr
        restListeCmrMockMvc.perform(post("/api/liste-cmrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listeCmr)))
            .andExpect(status().isCreated());

        // Validate the ListeCmr in the database
        List<ListeCmr> listeCmrList = listeCmrRepository.findAll();
        assertThat(listeCmrList).hasSize(databaseSizeBeforeCreate + 1);
        ListeCmr testListeCmr = listeCmrList.get(listeCmrList.size() - 1);
        assertThat(testListeCmr.getRefListe()).isEqualTo(DEFAULT_REF_LISTE);
    }

    @Test
    @Transactional
    public void createListeCmrWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = listeCmrRepository.findAll().size();

        // Create the ListeCmr with an existing ID
        listeCmr.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restListeCmrMockMvc.perform(post("/api/liste-cmrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listeCmr)))
            .andExpect(status().isBadRequest());

        // Validate the ListeCmr in the database
        List<ListeCmr> listeCmrList = listeCmrRepository.findAll();
        assertThat(listeCmrList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllListeCmrs() throws Exception {
        // Initialize the database
        listeCmrRepository.saveAndFlush(listeCmr);

        // Get all the listeCmrList
        restListeCmrMockMvc.perform(get("/api/liste-cmrs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(listeCmr.getId().intValue())))
            .andExpect(jsonPath("$.[*].refListe").value(hasItem(DEFAULT_REF_LISTE.toString())));
    }
    
    @Test
    @Transactional
    public void getListeCmr() throws Exception {
        // Initialize the database
        listeCmrRepository.saveAndFlush(listeCmr);

        // Get the listeCmr
        restListeCmrMockMvc.perform(get("/api/liste-cmrs/{id}", listeCmr.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(listeCmr.getId().intValue()))
            .andExpect(jsonPath("$.refListe").value(DEFAULT_REF_LISTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingListeCmr() throws Exception {
        // Get the listeCmr
        restListeCmrMockMvc.perform(get("/api/liste-cmrs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateListeCmr() throws Exception {
        // Initialize the database
        listeCmrRepository.saveAndFlush(listeCmr);

        int databaseSizeBeforeUpdate = listeCmrRepository.findAll().size();

        // Update the listeCmr
        ListeCmr updatedListeCmr = listeCmrRepository.findById(listeCmr.getId()).get();
        // Disconnect from session so that the updates on updatedListeCmr are not directly saved in db
        em.detach(updatedListeCmr);
        updatedListeCmr
            .refListe(UPDATED_REF_LISTE);

        restListeCmrMockMvc.perform(put("/api/liste-cmrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedListeCmr)))
            .andExpect(status().isOk());

        // Validate the ListeCmr in the database
        List<ListeCmr> listeCmrList = listeCmrRepository.findAll();
        assertThat(listeCmrList).hasSize(databaseSizeBeforeUpdate);
        ListeCmr testListeCmr = listeCmrList.get(listeCmrList.size() - 1);
        assertThat(testListeCmr.getRefListe()).isEqualTo(UPDATED_REF_LISTE);
    }

    @Test
    @Transactional
    public void updateNonExistingListeCmr() throws Exception {
        int databaseSizeBeforeUpdate = listeCmrRepository.findAll().size();

        // Create the ListeCmr

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListeCmrMockMvc.perform(put("/api/liste-cmrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listeCmr)))
            .andExpect(status().isBadRequest());

        // Validate the ListeCmr in the database
        List<ListeCmr> listeCmrList = listeCmrRepository.findAll();
        assertThat(listeCmrList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteListeCmr() throws Exception {
        // Initialize the database
        listeCmrRepository.saveAndFlush(listeCmr);

        int databaseSizeBeforeDelete = listeCmrRepository.findAll().size();

        // Get the listeCmr
        restListeCmrMockMvc.perform(delete("/api/liste-cmrs/{id}", listeCmr.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ListeCmr> listeCmrList = listeCmrRepository.findAll();
        assertThat(listeCmrList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListeCmr.class);
        ListeCmr listeCmr1 = new ListeCmr();
        listeCmr1.setId(1L);
        ListeCmr listeCmr2 = new ListeCmr();
        listeCmr2.setId(listeCmr1.getId());
        assertThat(listeCmr1).isEqualTo(listeCmr2);
        listeCmr2.setId(2L);
        assertThat(listeCmr1).isNotEqualTo(listeCmr2);
        listeCmr1.setId(null);
        assertThat(listeCmr1).isNotEqualTo(listeCmr2);
    }
}
