package demochimie.repository;

import demochimie.domain.FicheRetourProduit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FicheRetourProduit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FicheRetourProduitRepository extends JpaRepository<FicheRetourProduit, Long> {

}
