package demochimie.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(demochimie.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(demochimie.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(demochimie.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(demochimie.domain.Groupe.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.Groupe.class.getName() + ".droitDacceeProduits", jcacheConfiguration);
            cm.createCache(demochimie.domain.Groupe.class.getName() + ".mailGestionnaires", jcacheConfiguration);
            cm.createCache(demochimie.domain.Groupe.class.getName() + ".listeGroupeInvites", jcacheConfiguration);
            cm.createCache(demochimie.domain.DroitDacceeProduit.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.DroitDacceeProduit.class.getName() + ".groupes", jcacheConfiguration);
            cm.createCache(demochimie.domain.DroitDacceeProduit.class.getName() + ".ficheArticles", jcacheConfiguration);
            cm.createCache(demochimie.domain.MailGestionnaire.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheArticle.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheArticle.class.getName() + ".ficheEmpruntProduits", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheArticle.class.getName() + ".ficheRetourProduits", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheArticle.class.getName() + ".ficheDeCommandeProduits", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheArticle.class.getName() + ".listeMotsCles", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheArticle.class.getName() + ".typeDeConditionnements", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheArticle.class.getName() + ".localisations", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheArticle.class.getName() + ".documents", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheArticle.class.getName() + ".unites", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheArticle.class.getName() + ".ficheProduitChimiques", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheArticle.class.getName() + ".classifications", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheProduitChimique.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheProduitChimique.class.getName() + ".listeCmrs", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheProduitChimique.class.getName() + ".ficheArticles", jcacheConfiguration);
            cm.createCache(demochimie.domain.ListeMotsCles.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheDeCommandeProduit.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheDeCommandeProduit.class.getName() + ".fournisseurs", jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheEmpruntProduit.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.FicheRetourProduit.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.Fournisseur.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.Fournisseur.class.getName() + ".ficheDeCommandeProduits", jcacheConfiguration);
            cm.createCache(demochimie.domain.TypeDeConditionnement.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.Document.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.Document.class.getName() + ".ficheArticles", jcacheConfiguration);
            cm.createCache(demochimie.domain.Localisation.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.Localisation.class.getName() + ".typeLieuStockages", jcacheConfiguration);
            cm.createCache(demochimie.domain.Unite.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.Unite.class.getName() + ".ficheArticles", jcacheConfiguration);
            cm.createCache(demochimie.domain.ListeCmr.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.TypeLieuStockage.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.Classification.class.getName(), jcacheConfiguration);
            cm.createCache(demochimie.domain.Classification.class.getName() + ".ficheArticles", jcacheConfiguration);
            cm.createCache(demochimie.domain.ListeGroupeInvite.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
