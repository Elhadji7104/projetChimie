package demochimie.repository;

import demochimie.domain.FicheDeCommandeProduit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the FicheDeCommandeProduit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FicheDeCommandeProduitRepository extends JpaRepository<FicheDeCommandeProduit, Long> {

    @Query(value = "select distinct fiche_de_commande_produit from FicheDeCommandeProduit fiche_de_commande_produit left join fetch fiche_de_commande_produit.fournisseurs",
        countQuery = "select count(distinct fiche_de_commande_produit) from FicheDeCommandeProduit fiche_de_commande_produit")
    Page<FicheDeCommandeProduit> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct fiche_de_commande_produit from FicheDeCommandeProduit fiche_de_commande_produit left join fetch fiche_de_commande_produit.fournisseurs")
    List<FicheDeCommandeProduit> findAllWithEagerRelationships();

    @Query("select fiche_de_commande_produit from FicheDeCommandeProduit fiche_de_commande_produit left join fetch fiche_de_commande_produit.fournisseurs where fiche_de_commande_produit.id =:id")
    Optional<FicheDeCommandeProduit> findOneWithEagerRelationships(@Param("id") Long id);

    @Query(value = "select distinct fiche_de_commande_produit from FicheDeCommandeProduit fiche_de_commande_produit left join fetch fiche_de_commande_produit.fournisseurs left join fetch fiche_de_commande_produit.user where fiche_de_commande_produit.user.login=:login")
    List<FicheDeCommandeProduit> findAllUser(String login);

    @Query(value = "select distinct fiche_de_commande_produit from FicheDeCommandeProduit fiche_de_commande_produit left join fetch fiche_de_commande_produit.fournisseurs left join fetch fiche_de_commande_produit.ficheArticle where fiche_de_commande_produit.ficheArticle.codeInterne=:groupe")
    List<FicheDeCommandeProduit> findAllGroupe(String groupe);
}
