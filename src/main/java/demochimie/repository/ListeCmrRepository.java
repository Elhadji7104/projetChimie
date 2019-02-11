package demochimie.repository;

import demochimie.domain.ListeCmr;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ListeCmr entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListeCmrRepository extends JpaRepository<ListeCmr, Long> {

}
