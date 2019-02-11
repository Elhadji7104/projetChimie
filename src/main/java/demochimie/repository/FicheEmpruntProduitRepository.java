package demochimie.repository;

import demochimie.domain.FicheEmpruntProduit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FicheEmpruntProduit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FicheEmpruntProduitRepository extends JpaRepository<FicheEmpruntProduit, Long> {

}
