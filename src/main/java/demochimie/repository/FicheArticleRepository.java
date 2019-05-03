package demochimie.repository;

import demochimie.domain.FicheArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the FicheArticle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FicheArticleRepository extends JpaRepository<FicheArticle, Long> {

    @Query(value = "select distinct fiche_article from FicheArticle fiche_article left join fetch fiche_article.documents left join fetch fiche_article.unite left join fetch fiche_article.ficheProduitChimiques left join fetch fiche_article.classifications",
        countQuery = "select count(distinct fiche_article) from FicheArticle fiche_article")
    Page<FicheArticle> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct fiche_article from FicheArticle fiche_article left join fetch fiche_article.documents left join fetch fiche_article.unite left join fetch fiche_article.ficheProduitChimiques left join fetch fiche_article.classifications")
    List<FicheArticle> findAllWithEagerRelationships();

    @Query("select fiche_article from FicheArticle fiche_article left join fetch fiche_article.documents left join fetch fiche_article.unite left join fetch fiche_article.ficheProduitChimiques left join fetch fiche_article.classifications where fiche_article.id =:id")
    Optional<FicheArticle> findOneWithEagerRelationships(@Param("id") Long id);


    // TODO modifier requête avec liste des groupe ami et avec produit
    /*
    @Query(value = "select distinct fiche_article from FicheArticle fiche_article left join fetch fiche_article.documents left join fetch fiche_article.unite left join fetch fiche_article.ficheProduitChimiques left join fetch fiche_article.classifications where fiche_article.codeInterne=:groupe or fiche_article =(select fiche_article from fiche_article left join fiche_article.droit_daccee_produit where droit_daccee_produit.groupe_id =: groupe ) or fiche_article.codeInterne=(select groupeAccueil From liste_groupe_invite where groupeInvite=:groupe)")
     */
    @Query(value = "select distinct fiche_article from FicheArticle fiche_article left join fetch fiche_article.documents left join fetch fiche_article.unite left join fetch fiche_article.ficheProduitChimiques left join fetch fiche_article.classifications where fiche_article.codeInterne=:groupe")
    List<FicheArticle> findAllWithEagerRelationshipsGroup(@Param("groupe") String groupe);
}
