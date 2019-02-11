package demochimie.web.rest;

import demochimie.ProjetChimieApp;

import demochimie.domain.FicheArticle;
import demochimie.repository.FicheArticleRepository;
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
import java.util.ArrayList;
import java.util.List;


import static demochimie.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import demochimie.domain.enumeration.DisponibliteArticle;
/**
 * Test class for the FicheArticleResource REST controller.
 *
 * @see FicheArticleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetChimieApp.class)
public class FicheArticleResourceIntTest {

    private static final String DEFAULT_REF_ARTICLE = "AAAAAAAAAA";
    private static final String UPDATED_REF_ARTICLE = "BBBBBBBBBB";

    private static final String DEFAULT_ETAT_PHYSIQUE = "AAAAAAAAAA";
    private static final String UPDATED_ETAT_PHYSIQUE = "BBBBBBBBBB";

    private static final String DEFAULT_CODE_INTERNE = "AAAAAAAAAA";
    private static final String UPDATED_CODE_INTERNE = "BBBBBBBBBB";

    private static final String DEFAULT_CODE_BARRE = "AAAAAAAAAA";
    private static final String UPDATED_CODE_BARRE = "BBBBBBBBBB";

    private static final DisponibliteArticle DEFAULT_DISPONIBLITE_ARTICLE = DisponibliteArticle.DISPONIBLE;
    private static final DisponibliteArticle UPDATED_DISPONIBLITE_ARTICLE = DisponibliteArticle.INDISPONIBLE;

    private static final Boolean DEFAULT_TYPE_DESUIVI = false;
    private static final Boolean UPDATED_TYPE_DESUIVI = true;

    private static final Boolean DEFAULT_ACCESSIBILITE = false;
    private static final Boolean UPDATED_ACCESSIBILITE = true;

    @Autowired
    private FicheArticleRepository ficheArticleRepository;

    @Mock
    private FicheArticleRepository ficheArticleRepositoryMock;

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

    private MockMvc restFicheArticleMockMvc;

    private FicheArticle ficheArticle;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FicheArticleResource ficheArticleResource = new FicheArticleResource(ficheArticleRepository);
        this.restFicheArticleMockMvc = MockMvcBuilders.standaloneSetup(ficheArticleResource)
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
    public static FicheArticle createEntity(EntityManager em) {
        FicheArticle ficheArticle = new FicheArticle()
            .refArticle(DEFAULT_REF_ARTICLE)
            .etatPhysique(DEFAULT_ETAT_PHYSIQUE)
            .codeInterne(DEFAULT_CODE_INTERNE)
            .codeBarre(DEFAULT_CODE_BARRE)
            .disponibliteArticle(DEFAULT_DISPONIBLITE_ARTICLE)
            .typeDesuivi(DEFAULT_TYPE_DESUIVI)
            .accessibilite(DEFAULT_ACCESSIBILITE);
        return ficheArticle;
    }

    @Before
    public void initTest() {
        ficheArticle = createEntity(em);
    }

    @Test
    @Transactional
    public void createFicheArticle() throws Exception {
        int databaseSizeBeforeCreate = ficheArticleRepository.findAll().size();

        // Create the FicheArticle
        restFicheArticleMockMvc.perform(post("/api/fiche-articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheArticle)))
            .andExpect(status().isCreated());

        // Validate the FicheArticle in the database
        List<FicheArticle> ficheArticleList = ficheArticleRepository.findAll();
        assertThat(ficheArticleList).hasSize(databaseSizeBeforeCreate + 1);
        FicheArticle testFicheArticle = ficheArticleList.get(ficheArticleList.size() - 1);
        assertThat(testFicheArticle.getRefArticle()).isEqualTo(DEFAULT_REF_ARTICLE);
        assertThat(testFicheArticle.getEtatPhysique()).isEqualTo(DEFAULT_ETAT_PHYSIQUE);
        assertThat(testFicheArticle.getCodeInterne()).isEqualTo(DEFAULT_CODE_INTERNE);
        assertThat(testFicheArticle.getCodeBarre()).isEqualTo(DEFAULT_CODE_BARRE);
        assertThat(testFicheArticle.getDisponibliteArticle()).isEqualTo(DEFAULT_DISPONIBLITE_ARTICLE);
        assertThat(testFicheArticle.isTypeDesuivi()).isEqualTo(DEFAULT_TYPE_DESUIVI);
        assertThat(testFicheArticle.isAccessibilite()).isEqualTo(DEFAULT_ACCESSIBILITE);
    }

    @Test
    @Transactional
    public void createFicheArticleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ficheArticleRepository.findAll().size();

        // Create the FicheArticle with an existing ID
        ficheArticle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFicheArticleMockMvc.perform(post("/api/fiche-articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheArticle)))
            .andExpect(status().isBadRequest());

        // Validate the FicheArticle in the database
        List<FicheArticle> ficheArticleList = ficheArticleRepository.findAll();
        assertThat(ficheArticleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFicheArticles() throws Exception {
        // Initialize the database
        ficheArticleRepository.saveAndFlush(ficheArticle);

        // Get all the ficheArticleList
        restFicheArticleMockMvc.perform(get("/api/fiche-articles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ficheArticle.getId().intValue())))
            .andExpect(jsonPath("$.[*].refArticle").value(hasItem(DEFAULT_REF_ARTICLE.toString())))
            .andExpect(jsonPath("$.[*].etatPhysique").value(hasItem(DEFAULT_ETAT_PHYSIQUE.toString())))
            .andExpect(jsonPath("$.[*].codeInterne").value(hasItem(DEFAULT_CODE_INTERNE.toString())))
            .andExpect(jsonPath("$.[*].codeBarre").value(hasItem(DEFAULT_CODE_BARRE.toString())))
            .andExpect(jsonPath("$.[*].disponibliteArticle").value(hasItem(DEFAULT_DISPONIBLITE_ARTICLE.toString())))
            .andExpect(jsonPath("$.[*].typeDesuivi").value(hasItem(DEFAULT_TYPE_DESUIVI.booleanValue())))
            .andExpect(jsonPath("$.[*].accessibilite").value(hasItem(DEFAULT_ACCESSIBILITE.booleanValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllFicheArticlesWithEagerRelationshipsIsEnabled() throws Exception {
        FicheArticleResource ficheArticleResource = new FicheArticleResource(ficheArticleRepositoryMock);
        when(ficheArticleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restFicheArticleMockMvc = MockMvcBuilders.standaloneSetup(ficheArticleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restFicheArticleMockMvc.perform(get("/api/fiche-articles?eagerload=true"))
        .andExpect(status().isOk());

        verify(ficheArticleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllFicheArticlesWithEagerRelationshipsIsNotEnabled() throws Exception {
        FicheArticleResource ficheArticleResource = new FicheArticleResource(ficheArticleRepositoryMock);
            when(ficheArticleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restFicheArticleMockMvc = MockMvcBuilders.standaloneSetup(ficheArticleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restFicheArticleMockMvc.perform(get("/api/fiche-articles?eagerload=true"))
        .andExpect(status().isOk());

            verify(ficheArticleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getFicheArticle() throws Exception {
        // Initialize the database
        ficheArticleRepository.saveAndFlush(ficheArticle);

        // Get the ficheArticle
        restFicheArticleMockMvc.perform(get("/api/fiche-articles/{id}", ficheArticle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ficheArticle.getId().intValue()))
            .andExpect(jsonPath("$.refArticle").value(DEFAULT_REF_ARTICLE.toString()))
            .andExpect(jsonPath("$.etatPhysique").value(DEFAULT_ETAT_PHYSIQUE.toString()))
            .andExpect(jsonPath("$.codeInterne").value(DEFAULT_CODE_INTERNE.toString()))
            .andExpect(jsonPath("$.codeBarre").value(DEFAULT_CODE_BARRE.toString()))
            .andExpect(jsonPath("$.disponibliteArticle").value(DEFAULT_DISPONIBLITE_ARTICLE.toString()))
            .andExpect(jsonPath("$.typeDesuivi").value(DEFAULT_TYPE_DESUIVI.booleanValue()))
            .andExpect(jsonPath("$.accessibilite").value(DEFAULT_ACCESSIBILITE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFicheArticle() throws Exception {
        // Get the ficheArticle
        restFicheArticleMockMvc.perform(get("/api/fiche-articles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFicheArticle() throws Exception {
        // Initialize the database
        ficheArticleRepository.saveAndFlush(ficheArticle);

        int databaseSizeBeforeUpdate = ficheArticleRepository.findAll().size();

        // Update the ficheArticle
        FicheArticle updatedFicheArticle = ficheArticleRepository.findById(ficheArticle.getId()).get();
        // Disconnect from session so that the updates on updatedFicheArticle are not directly saved in db
        em.detach(updatedFicheArticle);
        updatedFicheArticle
            .refArticle(UPDATED_REF_ARTICLE)
            .etatPhysique(UPDATED_ETAT_PHYSIQUE)
            .codeInterne(UPDATED_CODE_INTERNE)
            .codeBarre(UPDATED_CODE_BARRE)
            .disponibliteArticle(UPDATED_DISPONIBLITE_ARTICLE)
            .typeDesuivi(UPDATED_TYPE_DESUIVI)
            .accessibilite(UPDATED_ACCESSIBILITE);

        restFicheArticleMockMvc.perform(put("/api/fiche-articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFicheArticle)))
            .andExpect(status().isOk());

        // Validate the FicheArticle in the database
        List<FicheArticle> ficheArticleList = ficheArticleRepository.findAll();
        assertThat(ficheArticleList).hasSize(databaseSizeBeforeUpdate);
        FicheArticle testFicheArticle = ficheArticleList.get(ficheArticleList.size() - 1);
        assertThat(testFicheArticle.getRefArticle()).isEqualTo(UPDATED_REF_ARTICLE);
        assertThat(testFicheArticle.getEtatPhysique()).isEqualTo(UPDATED_ETAT_PHYSIQUE);
        assertThat(testFicheArticle.getCodeInterne()).isEqualTo(UPDATED_CODE_INTERNE);
        assertThat(testFicheArticle.getCodeBarre()).isEqualTo(UPDATED_CODE_BARRE);
        assertThat(testFicheArticle.getDisponibliteArticle()).isEqualTo(UPDATED_DISPONIBLITE_ARTICLE);
        assertThat(testFicheArticle.isTypeDesuivi()).isEqualTo(UPDATED_TYPE_DESUIVI);
        assertThat(testFicheArticle.isAccessibilite()).isEqualTo(UPDATED_ACCESSIBILITE);
    }

    @Test
    @Transactional
    public void updateNonExistingFicheArticle() throws Exception {
        int databaseSizeBeforeUpdate = ficheArticleRepository.findAll().size();

        // Create the FicheArticle

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFicheArticleMockMvc.perform(put("/api/fiche-articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheArticle)))
            .andExpect(status().isBadRequest());

        // Validate the FicheArticle in the database
        List<FicheArticle> ficheArticleList = ficheArticleRepository.findAll();
        assertThat(ficheArticleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFicheArticle() throws Exception {
        // Initialize the database
        ficheArticleRepository.saveAndFlush(ficheArticle);

        int databaseSizeBeforeDelete = ficheArticleRepository.findAll().size();

        // Get the ficheArticle
        restFicheArticleMockMvc.perform(delete("/api/fiche-articles/{id}", ficheArticle.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FicheArticle> ficheArticleList = ficheArticleRepository.findAll();
        assertThat(ficheArticleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FicheArticle.class);
        FicheArticle ficheArticle1 = new FicheArticle();
        ficheArticle1.setId(1L);
        FicheArticle ficheArticle2 = new FicheArticle();
        ficheArticle2.setId(ficheArticle1.getId());
        assertThat(ficheArticle1).isEqualTo(ficheArticle2);
        ficheArticle2.setId(2L);
        assertThat(ficheArticle1).isNotEqualTo(ficheArticle2);
        ficheArticle1.setId(null);
        assertThat(ficheArticle1).isNotEqualTo(ficheArticle2);
    }
}
