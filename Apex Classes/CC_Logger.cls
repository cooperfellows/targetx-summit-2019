public with sharing class CC_Logger {

	private static final String[] ADMIN_EMAILS = new String[] {'webdevs@champlain.edu'};
	//private static final Id cooperId = '##################';
  	//private static final Id paulId   = '##################';
	
	/**
	 *	Public entry method for logging an error.
	 */
	public static void err(String message) {
    	System.debug(message);
		//logToChatter(message);
		sendAdminEmail('Error', message);
	}
    
    /**
     *  Proof of concept for logging errors to Salesforce Chatter.
     */
//  private static void logToChatter(String message) {  	    	
//    	FeedItem chatterPost = new FeedItem();
//		chatterPost.ParentId = paulId;
//		chatterPost.ParentId = cooperId;
//		chatterPost.Body = message;
//		insert chatterPost;    	
//  }

    /**
     *  Send email message to admin emails
     */
	private static void sendAdminEmail(String subject, String body){		
		Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        
  		try {
	        mail.setToAddresses(ADMIN_EMAILS);
	        mail.setSubject(subject);
	        mail.setPlainTextBody(body);
	        Messaging.SendEmailResult[] results = Messaging.sendEmail(
	        	new Messaging.SingleEmailMessage[] { mail }
	        );
  		} catch (Exception e) {
  			System.debug('Exception while trying to send error email: ' + e.getMessage());
			System.debug(e.getMessage());
  		}
	}
}