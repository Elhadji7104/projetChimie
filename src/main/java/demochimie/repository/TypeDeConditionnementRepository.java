package demochimie.repository;

import demochimie.domain.TypeDeConditionnement;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TypeDeConditionnement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeDeConditionnementRepository extends JpaRepository<TypeDeConditionnement, Long> {

}
