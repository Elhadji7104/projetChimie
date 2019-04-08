package demochimie.repository;

import demochimie.domain.Classification;
import demochimie.domain.FicheArticle;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Classification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClassificationRepository extends JpaRepository<Classification, Long> {
    @Query(value = "select distinct classification from Classification classification   where classification.groupe=:groupe")
    List<Classification> findAllWithEagerRelationshipsGroup(@Param("groupe") String groupe);
}
