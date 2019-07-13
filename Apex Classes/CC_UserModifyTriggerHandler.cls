public virtual class CC_UserModifyTriggerHandler extends TriggerHandler {

	protected override void afterInsert() {
		linkContactBackToUser(Trigger.new);		
	}

	protected override void afterUpdate() {
		linkContactBackToUser(Trigger.new);		
	}

	@testVisible private static void linkContactBackToUser(List<User> userList) {
		system.debug('aha!');
		for (User user: userList) {
			// User links to its contact.  Contact does not know its user.
			Id userId = user.id;
			User u = [Select id, ContactId FROM User where id = :userId];
			
			Id contactId = u.contactid;
	
			// If user is linked to a contact...
			if (contactId != NULL) {
				Contact c = [Select id, TargetX_Base__Community_User__c FROM Contact where id = :contactId];
				if (c.TargetX_Base__Community_User__c != (String)userId) {
			
					// ...link Contact back to its user:
					c.TargetX_Base__Community_User__c = user.id;
					try {
						update c;
					} catch (Exception e) {
						CC_Logger.err('Exception attempting to link Contact to its User: ' + e.getMessage());
					}					
				}
			}
		}
	}

}