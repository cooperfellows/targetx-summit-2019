trigger ccUserModify on User (after insert, after update, before insert, before update) {
    // Pass off to our Trigger Handler
    System.debug('********* CC_UserModifyTriggerHandler Run Started *********');
    new CC_UserModifyTriggerHandler().run();
    System.debug('********* CC_UserModifyTriggerHandler Ended *********');  
}