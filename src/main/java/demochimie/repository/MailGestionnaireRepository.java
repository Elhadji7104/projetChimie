package demochimie.repository;

import demochimie.domain.MailGestionnaire;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MailGestionnaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MailGestionnaireRepository extends JpaRepository<MailGestionnaire, Long> {

}
