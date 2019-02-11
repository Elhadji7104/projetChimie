package demochimie.repository;

import demochimie.domain.ListeMotsCles;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ListeMotsCles entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListeMotsClesRepository extends JpaRepository<ListeMotsCles, Long> {

}
