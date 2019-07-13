/**
 * Description: Exposes community login functionality.
 *
 */
global with sharing class CCO_CommunitiesLoginController {
	global CCO_CommunitiesLoginController () {}
    
	// Code we will invoke on page load.
	global PageReference forwardToAuthPage() {
        String startUrl = System.currentPageReference().getParameters().get('startURL');
        if(startUrl == null) { startUrl = ''; }
        startUrl = Pattern.matches('(?i)CCO_CommunitiesLogin', startUrl) ? '' : startUrl;
        String displayType = System.currentPageReference().getParameters().get('display');
        // return Network.forwardToAuthPage(startUrl, displayType);
        return new PageReference(Site.getBaseUrl() + '/CCO_SiteLogin?startURL=' + EncodingUtil.urlEncode(startUrl,'UTF-8'));
    }
}