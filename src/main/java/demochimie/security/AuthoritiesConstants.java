package demochimie.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String HYGIENE_ET_SECURITE ="ROLE_HYGIENE_ET_SECURITE";

    public static final String GESTIONNAIRE_DE_BASE ="ROLE_GESTIONNAIRE_DE_BASE";

    public static final String ROLE_VALIDEUR ="ROLE_VALIDEUR";
    private AuthoritiesConstants() {
    }
}
