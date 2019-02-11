package demochimie.repository;

import demochimie.domain.DroitDacceeProduit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DroitDacceeProduit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DroitDacceeProduitRepository extends JpaRepository<DroitDacceeProduit, Long> {

}
