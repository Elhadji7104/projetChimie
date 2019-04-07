package demochimie.repository;

import demochimie.domain.FicheEmpruntProduit;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the FicheEmpruntProduit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FicheEmpruntProduitRepository extends JpaRepository<FicheEmpruntProduit, Long> {
    @Query(value = "select distinct ficheEmpruntProduit from FicheEmpruntProduit ficheEmpruntProduit left join fetch ficheEmpruntProduit.ficheArticle left join fetch ficheEmpruntProduit.user where ficheEmpruntProduit.user.login=:user")
    List<FicheEmpruntProduit> findAllUser(@Param("user") String user);
    @Query(value = "select distinct ficheEmpruntProduit from FicheEmpruntProduit ficheEmpruntProduit left join fetch ficheEmpruntProduit.ficheArticle left join fetch ficheEmpruntProduit.user where ficheEmpruntProduit.ficheArticle.codeInterne=:groupe")
    List<FicheEmpruntProduit> findAllGroupe(@Param("groupe") String groupe);
}
