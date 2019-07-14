// Wait for the TX Angular App to be ready
function waitForTxApp(){
    if($('address-widget').length){
        // ready, so fire off our init
        // See if we have the library
        if(typeof $.fn.daterangepicker === 'function') {
            
            const ccDobFieldName = 'm0100-Contact-cc_Date_of_Birth__c';
            let $ccDobField = $('input[name="'+ccDobFieldName+'"]');
            const ccDobFieldHasValue = $ccDobField.val() === '' ? false : true;
            let drpOptions = {
                'singleDatePicker': true,
                'linkedCalendars': false,
                'showCustomRangeLabel': false,
                'minDate': '1/1/1980',
                'opens': 'right',
                'showDropdowns' : true,
                'locale': {
                    'format': 'MM/DD/YYYY',
                    'separator': ' - ',
                    'applyLabel': 'Apply',
                    'cancelLabel': 'Cancel',
                    'fromLabel': 'From',
                    'toLabel': 'To',
                    'customRangeLabel': 'Custom',
                    'weekLabel': 'W',
                    'daysOfWeek': [
                        'Su',
                        'Mo',
                        'Tu',
                        'We',
                        'Th',
                        'Fr',
                        'Sa'
                    ],
                    'monthNames': [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                    ],
                    'firstDay': 1
                }
            };

            // If we have an initial value, then we should init the calendar using that value
            if(ccDobFieldHasValue) {
                drpOptions['startDate'] = $ccDobField.val();
            }
            // if we dont have the value, we should init the calendar with ??? date????
            else {
                drpOptions['autoUpdateInput'] = false;

                $ccDobField.on('apply.daterangepicker', function(ev, picker) {
                    $(this).val(picker.startDate.format('MM/DD/YYYY')).trigger('change');
                });

                $ccDobField.on('cancel.daterangepicker', function(ev, picker) {
                    $(this).val('').trigger('change');
                });
            }
            

            $ccDobField.daterangepicker(drpOptions);  
        };

        // Enforce word count on personal statement field
        const personalStatementIds = [
          'm01400-TargetX_SRMb__Essay__c-TargetX_SRMb__Essay_Body__c-m01400-TargetX_SRMb__Essay__c-0-0',
          'm01500-TargetX_SRMb__Essay__c-TargetX_SRMb__Essay_Body__c-m01500-TargetX_SRMb__Essay__c-0-0',
          'm01600-TargetX_SRMb__Essay__c-TargetX_SRMb__Essay_Body__c-m01600-TargetX_SRMb__Essay__c-0-0',
          'm01700-TargetX_SRMb__Essay__c-TargetX_SRMb__Essay_Body__c-m01700-TargetX_SRMb__Essay__c-0-0'
        ];
        let personalStatementId = '';
        for (var i = personalStatementIds.length - 1; i >= 0; i--) {
          if($('#'+personalStatementIds[i]).length>0) {
            personalStatementId = personalStatementIds[i];
          }
        };
        if($('#'+personalStatementId).length){

          // Countable helper @see https://github.com/RadLikeWhoa/Countable
          try {
            !function(t){let n=[];const e=Array.prototype.forEach;function r(t){const n=[];let e=0;const r=t.length;for(;e<r;){const o=t.charCodeAt(e++);if(o>=55296&&o<=56319&&e<r){const r=t.charCodeAt(e++);56320==(64512&r)?n.push(((1023&o)<<10)+(1023&r)+65536):(n.push(o),e--)}else n.push(o)}return n}function o(t,n){const e=Object.prototype.toString.call(t),r="string"==typeof t||"[object NodeList]"===e||"[object HTMLCollection]"===e||1===t.nodeType,o="function"==typeof n;return r||console.error("Countable: Not a valid target"),o||console.error("Countable: Not a valid callback function"),r&&o}function c(t,n){let o=""+("string"==typeof t?t:"value"in t?t.value:t.textContent);(n=n||{}).stripTags&&(o=o.replace(/<\/?[a-z][^>]*>/gi,"")),n.ignore&&e.call(n.ignore,function(t){o=o.replace(t,"")});const c=o.trim();return{paragraphs:c?(c.match(n.hardReturns?/\n{2,}/g:/\n+/g)||[]).length+1:0,sentences:c?(c.match(/[.?!â€¦]+./g)||[]).length+1:0,words:c?(c.replace(/['";:,.?Â¿\-!Â¡]+/g,"").match(/\S+/g)||[]).length:0,characters:c?r(c.replace(/\s/g,"")).length:0,all:r(o).length}}const i={on:function(t,r,i){if(o(t,r))return Array.isArray(t)||(t=[t]),e.call(t,function(t){const e=function(){r.call(t,c(t,i))};n.push({element:t,handler:e}),e(),t.addEventListener("input",e)}),this},off:function(t){if(o(t,function(){}))return Array.isArray(t)||(t=[t]),n.filter(function(n){return-1!==t.indexOf(n.element)}).forEach(function(t){t.element.removeEventListener("input",t.handler)}),n=n.filter(function(n){return-1===t.indexOf(n.element)}),this},count:function(t,n,r){if(o(t,n))return Array.isArray(t)||(t=[t]),e.call(t,function(t){n.call(t,c(t,r))}),this},enabled:function(t){return void 0===t.length&&(t=[t]),n.filter(function(n){return-1!==t.indexOf(n.element)}).length===t.length}};"object"==typeof exports?module.exports=i:"function"==typeof define&&define.amd?define(function(){return i}):t.Countable=i}(this);
          } catch(e) {
            console.log(e);
          }

          // We have the field
          let statementValidation = {
            minWords : 250,
            maxWords : 650,
            minWordErrorMsg : 'This is your chance to let us know about you, please add a little more content to your personal statement.',
            maxWordErrorMsg : 'Wow! That\'s quite the personal statement! Please try to keep it under 650 words.',
            currWordCount : 0,
            wordCounter : '<div id="cc-statement-word-count-wrapper" class="cc-statement-validation-warning">Current Word Count (650 Max): <span id="cc-statement-word-count"></span></div>'
          };
          statementValidation.enableWordCount = function(){
            // Add a word counter
            $('#' + personalStatementId).parent().parent().parent().append(statementValidation.wordCounter);
            Countable.on(document.getElementById(personalStatementId),function(e){
              $('#cc-statement-word-count').html(e.words);
              if(e.words>statementValidation.maxWords && !$('.cc-statement-validation-warning.cc-too-long').length) {
                $('#cc-statement-word-count-wrapper').append('<div class="cc-statement-validation-warning cc-too-long">'+statementValidation.maxWordErrorMsg+'</div>');
              }
              if(e.words<=statementValidation.maxWords){
                $('.cc-statement-validation-warning.cc-too-long').remove();
              }
              if(e.words<=statementValidation.minWords && !$('.cc-statement-validation-warning.cc-too-short').length) {
                $('#cc-statement-word-count-wrapper').append('<div class="cc-statement-validation-warning cc-too-short">'+statementValidation.minWordErrorMsg+'</div>');
              }
              if(e.words>statementValidation.minWords){
                $('.cc-statement-validation-warning.cc-too-short').remove();
              }
            });
          };
          statementValidation.enableWordCount();
        }

        // Guidance Counselor Checkbox
        const counselorRecFlagId = 'm0800-TargetX_SRMb__Enrollment_History__c-cc_Counselor_Is_Recommender__c-m0800-TargetX_SRMb__Enrollment_History__c-0-0';
        const counselorToRecMapping = {
          'first' : {
            'source' : 'm0800-TargetX_SRMb__Enrollment_History__c-Counselor_First_Name__c-m0800-TargetX_SRMb__Enrollment_History__c-0-0',
            'target' : 'm01000-TargetX_SRMb__Recommendation__c-TargetX_SRMb__First_Name__c-m01000-TargetX_SRMb__Recommendation__c-0-0'
          },
          'last' : {
            'source' : 'm0800-TargetX_SRMb__Enrollment_History__c-Counselor_Last_Name__c-m0800-TargetX_SRMb__Enrollment_History__c-0-0',
            'target' : 'm01000-TargetX_SRMb__Recommendation__c-TargetX_SRMb__Last_Name__c-m01000-TargetX_SRMb__Recommendation__c-0-0'
          },
          'email' : {
            'source' : 'm0800-TargetX_SRMb__Enrollment_History__c-Counselor_Email_Address__c-m0800-TargetX_SRMb__Enrollment_History__c-0-0',
            'target' : 'm01000-TargetX_SRMb__Recommendation__c-TargetX_SRMb__Email__c-m01000-TargetX_SRMb__Recommendation__c-0-0'
          },
          'phone' : {
            'source' : 'm0800-TargetX_SRMb__Enrollment_History__c-cc_Counselor_Phone_Number__c-m0800-TargetX_SRMb__Enrollment_History__c-0-0',
            'target' : 'm01000-TargetX_SRMb__Recommendation__c-TargetX_SRMb__Phone__c-m01000-TargetX_SRMb__Recommendation__c-0-0'
          }
        };
        if($('#' + counselorRecFlagId).length) {
          $('#' + counselorRecFlagId).on('change',function(){
            // If it's now checked, pull Counselor fields and add to rec fields.
            if($(this).is(':checked')){
              // Loop through our mapping and copy from source to target
              Object.keys(counselorToRecMapping).forEach(function(field){
                if($('#' + counselorToRecMapping[field].source).val()) {
                  $('#' + counselorToRecMapping[field].target).val($('#' + counselorToRecMapping[field].source).val());
                  $('#' + counselorToRecMapping[field].target).trigger('change');
                }
              });
            }
          });
        }
        // Google Analytics Cookie Parsing
        var ccGaParse = new Object();

        ccGaParse.targetFields = [
          'm0100-TargetX_SRMb__Application__c-cc_Web_Campaign__c',
          'm0100-TargetX_SRMb__Application__c-cc_Web_Content__c',
          'm0100-TargetX_SRMb__Application__c-cc_Web_Current_Visit__c',
          'm0100-TargetX_SRMb__Application__c-cc_Web_First_Visit__c',
          'm0100-TargetX_SRMb__Application__c-cc_Web_IP_Address__c',
          'm0100-TargetX_SRMb__Application__c-cc_Web_Keyword_Term__c',
          'm0100-TargetX_SRMb__Application__c-cc_Web_Medium__c',
          'm0100-TargetX_SRMb__Application__c-cc_Web_Pages_Viewed__c',
          'm0100-TargetX_SRMb__Application__c-cc_Web_Previous_Visit__c',
          'm0100-TargetX_SRMb__Application__c-cc_Web_Source__c',
          'm0100-TargetX_SRMb__Application__c-cc_Web_Times_Visited__c',
        ];

        // URL of the apply page as of 2019-01-08 for Trad
        ccGaParse.txApplyPath = '/ugonlineapp/TargetX_App__Apply2';

        // Determine if we should do any work
        ccGaParse.shouldRun = function(){
          var shouldRun = false;
          // We only run if we are currently filling out an application
          // and the app has the fields we want (and those fields are empty)
          if(document.location.pathname === ccGaParse.txApplyPath) {
            // Now see if we have any of the fields we are looking for
            for (var i = ccGaParse.targetFields.length - 1; i >= 0; i--) {
              if($('#' + ccGaParse.targetFields[i]).length) {
                shouldRun = true;
              }
            };
          }

          return shouldRun;
        };

        // Our init method
        ccGaParse.init = function(){
          // See if we should run the GA code
          if(ccGaParse.shouldRun()) {

            // Method to parse GA Cookies
            ccGaParse.parseCookies = function(){
              var utmz = ccGaParse.readCookie('__utmz'),
                  utma = ccGaParse.readCookie('__utma'),
                  utmb = ccGaParse.readCookie('__utmb'),
                  vals = {},
                  i    = 0,
                  temp,
                  pages_viewed;

              utmz = utmz ? utmz.split('.').slice(4).join('.').split('|') : [];

              for (i; i < utmz.length; i++) {
                temp = utmz[i].split('=');
                vals[temp[0]] = temp[1];
              }

              utma = utma ? utma.split('.').slice(2) : [];
              pages_viewed = utmb ? utmb.split('.')[1] : 1;

              // map cookie values to their related field names
              return {
                'm0100-TargetX_SRMb__Application__c-cc_Web_Medium__c': (vals.utmgclid ? "cpc" : (vals.utmcmd || null)),
                'm0100-TargetX_SRMb__Application__c-cc_Web_Keyword_Term__c': vals.utmctr || null,
                'm0100-TargetX_SRMb__Application__c-cc_Web_Content__c': vals.utmcct || null,
                'm0100-TargetX_SRMb__Application__c-cc_Web_Campaign__c': vals.utmccn || null,
                'm0100-TargetX_SRMb__Application__c-cc_Web_Source__c': (vals.utmgclid ? "google" : (vals.utmcsr || null)),
                'm0100-TargetX_SRMb__Application__c-cc_Web_First_Visit__c':utma[0] || null,
                'm0100-TargetX_SRMb__Application__c-cc_Web_Previous_Visit__c':utma[1] || null,
                'm0100-TargetX_SRMb__Application__c-cc_Web_Current_Visit__c':utma[2] || null,
                'm0100-TargetX_SRMb__Application__c-cc_Web_Times_Visited__c':utma[3] || null,
                'm0100-TargetX_SRMb__Application__c-cc_Web_Pages_Viewed__c':pages_viewed
              };
            };

            // Method to read cookies
            ccGaParse.readCookie = function(name) {
                var nameEQ = name + "=",
                    ca = document.cookie.split(';'),
                    i = 0,
                    c;
                for(i;i < ca.length;i++) {
                    c = ca[i];
                    while (c.charAt(0)===' ') {c = c.substring(1,c.length);}
                    if (c.indexOf(nameEQ) === 0) {return c.substring(nameEQ.length,c.length);}
                }
                return null;
            };

            // Simple string cleaner method
            ccGaParse.stringClean = function(string){
              //make sure we were passed a string
              if(typeof(string) == 'string'){
                  //array of elements we want to replace
                  var replace = new Array('%20','%2b','%5f'),
                  //array of elements we want to add in
                  by = new Array(' ','+','_'),
                  //now loop through our replace array
                  //and analyze the characters in our string for
                  //possible replacements
                  replaceLength = replace.length,
                  i = 0;
                  for(i; i<replaceLength; i++){
                      //create a case insensitive regular expression 
                      //to catch all occurances of the replacement string
                      //then swap it with the equivalent character in the
                      //by array
                      string = string.replace(new RegExp(replace[i],"gi"),by[i]);
                  }
                  return string;
              }
            };

            // Now see which fields we should try to fill
            var validFields = ccGaParse.targetFields;
            for (var i = validFields.length - 1; i >= 0; i--) {
              // If the field exists
              if($('#' + validFields[i]).length){
                // and it does not yet have a value, we should try to fill that value
                // we don't want to ever overwrite this data
                if($('#' + validFields[i]).val() !== '') {
                  // this field has a value, it's not longer "valid" in our context
                  validFields.splice(i,1);
                }
              }
              else {
                // this field does not exist, it's not longer "valid" in our context
                validFields.splice(i,1);
              }
            };

            // Now for each of these valid fields, stick whatever data we have from the cookie in there
            var cookieData = ccGaParse.parseCookies();
            for (var i = validFields.length - 1; i >= 0; i--) {
              // If we don't trigger the on change, TX does not send the value even though it's there
              // maybe an angular limitation?
              $('#'+validFields[i]).val(cookieData[validFields[i]]).trigger('change');
            };
          }
        };
        ccGaParse.init();
    }
    else {
      setTimeout(waitForTxApp,200);
    }
}
// Now kick it off
waitForTxApp();
// Change faviCon
const changeFavicon = link => {
  let $favicon = document.querySelector('link[rel="icon"]');
  // If a <link rel="icon"> element already exists,
  // change its href to the given link.
  if ($favicon !== null) {
    $favicon.href = link;
  // Otherwise, create a new element and append it to <head>.
  } else {
    $favicon = document.createElement("link");
    $favicon.rel = "icon";
    $favicon.href = link;
    document.head.appendChild($favicon);
  }
}
changeFavicon('/resource/1521822008000/ChamplainCollegeShieldFavicon');