/**
 * Description: CCO Specific site login controller. Redirecting to the correct
 *				self registration URL.
 *
 * Author: Cooper Fellows
 * Email: cfellows@champlain.edu
 */
global with sharing class CCO_SiteLoginController {
    global String username {get; set;}
    global String password {get; set;}

    global PageReference login() {
        String startUrl = System.currentPageReference().getParameters().get('startURL');
        return Site.login(username, password, startUrl);
    }

    global PageReference getSelfRegUrl() {
        String startUrl = System.currentPageReference().getParameters().get('startURL');
        if(startUrl == null) { startUrl = ''; }
    	return new PageReference(Site.getBaseUrl() + '/CCO_CommunitiesCreateAccount?startURL=' + EncodingUtil.urlEncode(startUrl,'UTF-8'));
    }
    
    global CCO_SiteLoginController () {}
}