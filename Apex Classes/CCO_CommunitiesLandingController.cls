/**
 * Description: Champlain College Online Specific implementation of the TargetX Communities
 *				landing page controller. Helps route a visitor to the correct place.
 *
 * Author: Cooper Fellows
 * Email: cfellows@champlain.edu
 *
 */

public with sharing class CCO_CommunitiesLandingController {
    
    private TargetX_Base.TX_CommunitiesBase cont ;
	// Code we will invoke on page load.
	public PageReference forwardToStartPage() {
		// Check to see if they have a redirect cookie. If they do, send them there
		PageReference p = TargetX_Base.BasePackage.checkRedirectCookie() ;
		if(p != null) return p ;
		
		// this may need to be configurable at some point.
		// Apparently, that point is NOW!
		PageReference homepage = cont.getHomepageRef() ;
		if(homepage != null)
		{
			return homepage ;
		}
		else
		{
			return Page.CCO_CommunitiesHome ;
		}
	}
	
	public CCO_CommunitiesLandingController()
	{
		cont = new TargetX_Base.TX_CommunitiesBase() ;
	}
}