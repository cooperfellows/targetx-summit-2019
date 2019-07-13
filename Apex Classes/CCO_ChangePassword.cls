/**
 * An apex page controller that exposes the change password functionality
 */
public with sharing class CCO_ChangePasswordController {
    public String oldPassword {get; set;}
    public String newPassword {get; set;}
    public String verifyNewPassword {get; set;}        
    
    public PageReference changePassword() {
        return Site.changePassword(newPassword, verifyNewPassword, oldpassword);    
    }     
    
    public CCO_ChangePasswordController(TargetX_Base.TX_CommunitiesBase controller) {}
    public CCO_ChangePasswordController() {}
}