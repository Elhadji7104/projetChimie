package demochimie.repository;

import demochimie.domain.ListeGroupeInvite;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ListeGroupeInvite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListeGroupeInviteRepository extends JpaRepository<ListeGroupeInvite, Long> {

}
