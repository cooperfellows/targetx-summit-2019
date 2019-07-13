/**
 * Author: Cooper Fellows
 * Contact: cfellows@champlain.edu
 * Description: An apex page controller that exposes the site forgot password functionality
 * 
 * Based on TX_ForgotPasswordController
 */

public with sharing class CCO_ForgotPasswordController {

	public String username {get; set;}   
       
    public CCO_ForgotPasswordController(TargetX_Base.TX_CommunitiesBase controller) {}
    
    public CCO_ForgotPasswordController() {}
	
  	public PageReference forgotPassword() {
  		boolean success = Site.forgotPassword(username);
  		PageReference pr = Page.CCO_ForgotPasswordConfirm;
  		pr.setRedirect(true);
  		
  		if (success) {  			
  			return pr;
  		}
  		return null;
  	} 
}