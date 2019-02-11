package demochimie.repository;

import demochimie.domain.FicheProduitChimique;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FicheProduitChimique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FicheProduitChimiqueRepository extends JpaRepository<FicheProduitChimique, Long> {

}
