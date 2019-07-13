/**
 * An apex page controller that supports self registration of users in communities that allow self registration
 */
public without sharing class CCO_CommunitiesSelfRegController {
    public Contact[] insertContactFirst() {
    Contact c = new Contact() ;
    c.FirstName = firstName ;
    c.LastName = lastName ;
    c.Email = email ;
    insert c ;
    return [SELECT Id, AccountId, Account.OwnerId,
    Account.Owner.UserRoleId FROM Contact WHERE Id = :c.Id] ;
    }
    public String defaultAccountId {get; private set;}
    public String accountId {get;set;}
    public String accountIdCollege {get;set;}
    public String firstName {get; set;}
    public String lastName {get; set;}
    public String email {get; set;}
    public String password {get; set {password = value == null ? value : value.trim(); } }
    public String confirmPassword {get; set { confirmPassword = value == null ? value : value.trim(); } }
    public String communityNickname {get; set { communityNickname = value == null ? value : value.trim(); } }
    
    // Site Name?
    public String schoolRequired {get; set;}

    public CCO_CommunitiesSelfRegController(TargetX_Base.TX_CommunitiesBase controller) {
        defaultAccountId = null; // To be filled in by customer. (if school picker is on page this will default the value)
        accountid = defaultAccountId;
    }
    public CCO_CommunitiesSelfRegController() {}

    private boolean isValidPassword() {
        return password == confirmPassword;
    }

    public PageReference registerUser() {
        SavePoint sp = Database.setSavePoint();
        try{

            //Uncomment below to make school picker required
            // If schoolRequired (passed from the TX_CommunitiesSelfReg.page)
            if(schoolRequired == 'required') {
            	// See if we were passed the college ID
            	if(String.isBlank(accountId)) {
            		if(!String.isBlank(accountIdCollege)) {
            			accountId = accountIdCollege;
            		}
            	}
                if (String.isBlank(accountId)) {
                    ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.ERROR, 'Please Select A School');
                    ApexPages.addMessage(msg);
                    return null;
                }
            }            

            if (!isValidPassword()) {
                ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.ERROR, Label.site.passwords_dont_match);
                ApexPages.addMessage(msg);
                return null;
            }

			// To be filled in by customer.
            String profileId = [select Id from Profile where Name='Customer Community User (TargetX)'].Id;
            String roleEnum = null; // To be filled in by customer.

            // match existing contact
            Contact[] cs = [select id, accountid, account.ownerid, account.owner.userRoleId from Contact where email = :email];
            // Uncomment the following line if you want to use HEDA's administrative accounts.
            // NOTE: You will also need to make sure you have some way for account to be set to an owner with a role
            // on creation. By default, accounts will be created by the guest user and fail.
            //if(cs.size() == 0 && !hasDuplicateUser(email)) cs = insertContactFirst() ;
            if(String.isNotBlank(accountId)){
                for (Account a : [select Id, Owner.UserRoleId from Account where Id = :accountId]) {
                    if(a.Owner.UserRoleId == null) {
                        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Account Owner Missing Role'));
                        return null;
                    }
                }
            }

            // move contact to selected account if it's not the original and not default
            if (String.isNotBlank(accountId) && !cs.isEmpty() && cs[0].AccountId != defaultAccountId && cs[0].AccountId != accountId) {
                update new Contact(Id=cs[0].Id, AccountId=accountId);
            }

            if(!hasDuplicateUser(email)){

                String userName = email;

                User u = new User();
                u.Username = userName;
                u.Email = email;
                u.FirstName = firstName;
                u.LastName = lastName;
                u.CommunityNickname = getCommunityNickname();
                u.ProfileId = profileId;
                if(!cs.isEmpty()){
                    u.ContactId = cs[0].Id;
                    accountId = String.isBlank(accountId) ? cs[0].AccountId : accountId;
                }

                String userId = Site.createPortalUser(u, String.isBlank(accountId) ? null : accountId, password);

                if (userId != null) {
                    if (password != null && password.length() > 1) {
                        return Site.login(userName, password, ApexPages.currentPage().getParameters().get('startURL'));
                    }
                    else {
                        PageReference page = System.Page.CCO_CommunitiesAccountCreated;
                        // passes userName to self reg confirm page
                        page.getParameters().put('username', userName);
                        page.setRedirect(true);
                        return page;
                    }
                }
            }
        }
        catch(Exception ex){
            ApexPages.addMessages(ex);
        }
        Database.rollback(sp);
        return null;
    }

    private static Boolean hasDuplicateUser(String email){
        Boolean hasDupe = [SELECT Count() FROM User WHERE UserName = :email] > 0;
        if(hasDupe){
            ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.ERROR, Label.Duplicate_User_Exists);
            ApexPages.addMessage(msg);
        }
        return hasDupe;
    }

    private string getCommunityNickname() {
        // Perhaps make this query the database at some point
        return (communityNickname == null || communityNickname == '') ? (firstName.substring(0,1) + lastName + randomNumber()).toLowerCase() : communityNickname;
    }

    private string randomNumber() {
        Integer i1 = Math.abs(Crypto.getRandomInteger());
        Integer i2 = Math.abs(Crypto.getRandomInteger());
        Integer i3 = Math.abs(Crypto.getRandomInteger());
        return (String.valueOf(i1) + String.valueOf(i2) + String.valueOf(i3)).substring(0,3);
    }
}