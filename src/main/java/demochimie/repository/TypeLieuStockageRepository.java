package demochimie.repository;

import demochimie.domain.TypeLieuStockage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TypeLieuStockage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeLieuStockageRepository extends JpaRepository<TypeLieuStockage, Long> {

}
