package demochimie.repository;

import demochimie.domain.Unite;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Unite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UniteRepository extends JpaRepository<Unite, Long> {

}
