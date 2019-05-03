package demochimie.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

/**
 * Utility class for Spring Security.
 */
public final class SecurityUtils {

    public SecurityUtils() {
    }

    /**
     * Get the login of the current user.
     *
     * @return the login of the current user
     */
    public static Optional<String> getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
            .map(authentication -> {
                if (authentication.getPrincipal() instanceof UserDetails) {
                    UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
                    return springSecurityUser.getUsername();
                } else if (authentication.getPrincipal() instanceof String) {
                    return (String) authentication.getPrincipal();
                }
                return null;
            });
    }

    /**
     * Get the JWT of the current user.
     *
     * @return the JWT of the current user
     */
    public static Optional<String> getCurrentUserJWT() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
            .filter(authentication -> authentication.getCredentials() instanceof String)
            .map(authentication -> (String) authentication.getCredentials());
    }

    /**
     * Check if a user is authenticated.
     *
     * @return true if the user is authenticated, false otherwise
     */
    public static boolean isAuthenticated() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
            .map(authentication -> authentication.getAuthorities().stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(AuthoritiesConstants.ANONYMOUS)))
            .orElse(false);
    }

    /**
     * If the current user has a specific authority (security role).
     * <p>
     * The name of this method comes from the isUserInRole() method in the Servlet API
     *
     * @param authority the authority to check
     * @return true if the current user has the authority, false otherwise
     */
    public static boolean isCurrentUserInRole(String authority) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
            .map(authentication -> authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(authority)))
            .orElse(false);
    }

    /**
     * If the current user has a specific authority (security role).
     *
     * @param
     * @return true if the current user has the authority, false otherwise
     */
    /**
    public static String CurrentGroupeUser(String login) {
	//String login = getCurrentUserLogin()+"";
    String groupeName="";
    switch(login){
        case "ADMIN":
        groupeName = "groupe1";
        case "HYGIENE_ET_SECURITE":
        groupeName = "groupe2";
        case "VALIDEUR":
        groupeName = "groupe3";
        case "GESTIONNAIRE_DE_BASE":
        groupeName = "groupe4";    
        break;    
    }*/
    public static String CurrentGroupeUser() {
        String groupeName = "";
        String login = "ADMIN";

        Optional<String> user = getCurrentUserLogin();
        System.out.println(user.toString());
        switch (user.get()) {
            case "admin":
                login = "ADMIN";
                break;
            case "securite":
                login = "SECURITE";
                break;
            case "base":
                login = "CSM";
                break;
            case "valideur":
                login = "CSM";
                break;
            case "corint":
                login = "CORINT";
                break;
            case "csm":
                login = "CSM";
                break;

            case "berree":
                login = "C2";
                break;
            case "aludwig":
                login = "C2";
                break;
            case "cbarrillon":
                login = "C2";
                break;
            case "alecorne":
                login = "C2";
                break;

                case "jpguegan":
                login = "ZZ";
                break;
        }
        switch (login) {

            case "C2":
            groupeName = "C2";
            break;

            case "ZZ":
            groupeName = "ZZ";
            break;

            case "CORINT":
                groupeName = "AA";
                break;
            case "CSM":
                groupeName = "BA";
                break;
            case "V&C":
                groupeName = "CA";
                break;
            case "MaCSE":
                groupeName = "DA";
                break;
            case "OMC":
                groupeName = "EA";
                break;
            case "CMET":
                groupeName = "FA";
                break;
            case "CIP":
                groupeName = "GA";
                break;
            case "SECURITE":
                groupeName = "SECURITE";
                break;
            case "ADMIN":
                groupeName = "ADMIN";
                break;
        }
        return groupeName;
    }

    /**
     * Get the JWT of the current user.
     *
     * @return the JWT of the current user
     */
    public static String getCurrentUserJWTRole() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
       if(Optional.ofNullable(securityContext.getAuthentication())
            .map(authentication -> authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN")))
            .orElse(false)){
           return "ROLE_ADMIN";
       }
        if(Optional.ofNullable(securityContext.getAuthentication())
            .map(authentication -> authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_USER")))
            .orElse(false)){
            return "ROLE_USER";
        }
        if(Optional.ofNullable(securityContext.getAuthentication())
            .map(authentication -> authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_HYGIENE_ET_SECURITE")))
            .orElse(false)){
            return "ROLE_HYGIENE_ET_SECURITE";
        }
        if(Optional.ofNullable(securityContext.getAuthentication())
            .map(authentication -> authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_VALIDEUR")))
            .orElse(false)){
            return "ROLE_VALIDEUR";
        }
        if(Optional.ofNullable(securityContext.getAuthentication())
            .map(authentication -> authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_GESTIONNAIRE_DE_BASE")))
            .orElse(false)){
            return "ROLE_GESTIONNAIRE_DE_BASE";
        }
       return null;
    }
}
