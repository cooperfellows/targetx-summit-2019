@isTest
public with sharing class CC_UserModifyTriggerHandler_TEST {
	private static Contact c1;
	private static User u1;
	private static Account a1;
	
	private static void setup() {
		a1 = new Account(
			Name='Test Account Name'
		);
  		insert a1;
		c1 = new Contact(
			FirstName = 'Lester',
			LastName = 'Tester',
			Email = 'lester@tester.org',
			Phone = '(415) 555-1212',
			AccountId = a1.id
		);
		insert c1;
		u1 = new User(
			ContactId = c1.id,
			username = 'lester@tester.com',
			lastName = 'Tester',
			email = 'lester@tester.com',
			alias = 'LesTes',
			communityNickname = 'LesTes',
			TimeZoneSidKey = 'GMT',
			LocaleSidKey = 'en_US',
			EmailEncodingKey = 'ISO-8859-1',
			ProfileId = [SELECT Id FROM Profile WHERE Name = 'Customer Community User (TargetX)'][0].Id,
			LanguageLocaleKey = 'en_US'
		);
		insert u1;
	}
	
    @isTest
    public static void testLinkContactBackToUser() {
    	setup();
		Contact c2 = [SELECT id, TargetX_Base__Community_User__c FROM Contact WHERE id = :c1.id];
    	system.assert(u1.contactId == c2.id);
    	system.assert(c2.TargetX_Base__Community_User__c == u1.id);
    }
}

