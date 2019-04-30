package demochimie.repository;

import demochimie.domain.FicheRetourProduit;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the FicheRetourProduit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FicheRetourProduitRepository extends JpaRepository<FicheRetourProduit, Long> {
    @Query(value = "select distinct ficheRetourProduit from FicheRetourProduit ficheRetourProduit left join fetch ficheRetourProduit.ficheArticle left join fetch ficheRetourProduit.user where ficheRetourProduit.user.login=:user")
    List<FicheRetourProduit> findAllUser(@Param("user") String user);
    @Query(value = "select distinct ficheRetourProduit from FicheRetourProduit ficheRetourProduit left join fetch ficheRetourProduit.ficheArticle left join fetch ficheRetourProduit.user where ficheRetourProduit.ficheArticle.codeInterne=:groupe")
    List<FicheRetourProduit> findAllGroupe(@Param("groupe") String groupe);
}
