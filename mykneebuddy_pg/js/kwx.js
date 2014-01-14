// JavaScript Document

 var connType = "contentType=application/json";
 if(!kwObj){
	 var kwObj = {};
 }
     kwObj.Host = "http://www.kawipay.com/" 
	 //kwObj.Host = "http://localhost/AMFPHP_Server/public_html/" 
 	 kwObj.amfDestination =  kwObj.Host + "amf.php?" + connType; 
	 kwObj.loadingImg = '<img src="/assets/images/loading.gif" height="16" width="16" />';
	 kwObj.errMsg = $('#err_msg');
	 
        
 var kwx;
	if(!kwx){
		kwx = {
				
				init: function(str){
					if(str == true){
						return " dataType: 'json'"
					}
				},
				
				// sendData handles ajax i/o
				sendData: function(transmitter_type, url, customData, resultHandler){				     
					
					 $('body').append('<i id="spinner" class="icon-spinner icon-spin orange bigger-125" />');
					 $('#spinner').fadeIn('fast');
							
					 $.ajax({
						type: transmitter_type,
						url:  url,
						data:  customData,
						dataType: 'jsonp',
												
						success: resultHandler
					});
				   
				    setTimeout(function () { 
						$('#spinner').fadeOut('fast');
					}, 1000);					
				}, 
				
				
				connector : function (str,url, callback){
							
					kwx.sendData('post', url, str, callback);
						 
				},
								
								
				/* This method is used to make amfphp calls to AMFPHP server
				* @param svc The name of the Service to call, eg: MemberService
				* @param mthd The method/function of the Service, eg: addMember();
				* @param param Parametres to send to the server
				* @param success_callback Pass a custom function to handle any return data (Must be json)
				*/				
				amfServiceCall: function (svc, mthd, resultHandler){
					
					var callDataObj = {"serviceName":svc, "methodName":mthd};									
					var callData = JSON.stringify(callDataObj);
					
					$.post(kwObj.amfDestination, callData, resultHandler);
					
				 },
            
            
                
                amfServiceCallParam: function (svc, mthd, param, resultHandler){
					
                        var callDataObj = {"serviceName":svc, "methodName":mthd, "parameters":param}						
					    var callData = JSON.stringify(callDataObj);
					
					$.post(kwObj.amfDestination, callData, resultHandler);
					
				 },
				 
				
				 formData: function (frmID){
		  
						var str = $(frmID).serialize();
						var obj = kwx.stringToJson(str);
						
						return [obj];
				},
				
				stringToJson: function (str){
					
					var arr = str.split('&');
						var obj = {};
						for(var i = 0; i < arr.length; i++) {
								var bits = arr[i].split('=');
								obj[bits[0]] = kwx.urlencode(bits[1]);
						}
					
					return obj;
					
				},
				
				// convert object back to string
				jsonToString: function (obj){
					
					str = '';
					for(key in obj) {
						str += key + '=' + obj[key] + '&';
					}
					str = str.slice(0, str.length - 1);
					
					return str;
				
				},
				
				
				
				fixedEncodeURIComponent: function (str) {
				  return encodeURIComponent(str);//.replace(/[!'()*]/g, escape);
				},
				
				
				urlencode: function(str) {
				
					return escape(str).replace(/\+/g, ' ').replace(/%40/g, '@').replace(/%2540/g, '@').replace(/%27/g, "'").replace(/%252C/g, ",").replace(/%252F/g, "/").replace(/%253C/g, "/").replace(/%2509/g, "/").replace(/Http%253A/g, "http:").replace(/http%253A/g, "http:").replace(/%3A/g, ":").replace(/%2B/g,'+').replace(/%20/g, '+').replace(/%2A/g, '*').replace(/%2F/g, '/').replace(/%250D%250A/g, "<br/>").replace(/%3C/g, "<").replace(/%3E/g, ">").replace(/%23/g, "#").replace(/%25/g, "%").replace(/%7B/g, "{").replace(/%7D/g, "}").replace(/%7C/g, "|").replace(/%5C/g, "'\'").replace(/%5E/g, "^").replace(/%7E/g, "~").replace(/%24/g, "$").replace(/%26/g, "&").replace(/%3D/g, "=").replace(/%3A/g, ":").replace(/%3F/g, "?").replace(/%3B/g, ";").replace(/%60/g, "'").replace(/%5D/g, "]").replace(/%5B/g, "[").replace(/%22/g, '"').replace(/%C2%A3/g, '£').replace(/%28/g, '(').replace(/%29/g, ')');
				},
				
								 
			
				showPopUp: function ($page) {
		  
					$.colorbox({href: $page,top:'25%', width:'415px'});	
					  
				},
				
				
				fetchPage : function(el, active_class, display_el, url ){
					url = (typeof url == 'undefined') ? '/modlet/posts/ajax/getPost'  : url ;
					$(el).click(function(e){
						e.preventDefault();
						var slug = $(this).attr('id');	
						var slg = 'pg_slug='+slug;	
						
						$(el).removeClass(active_class)
						$('#'+slug).addClass(active_class)
						
					
						  kwx.sendData('post', url, slg, function callServiceHandler(data){
							  
								$(display_el).html(data);
						  });
						  
					  
					});
				},
				
				
				
				// search the menu code for a page name and set that page's link ID to "active"

				setActiveItem : function (menu_name, page) {
					// get the menu code from the containing div
					// note that IE capitalizes HTML tags in this value, so we have to use case-insensitive regexps below
					menu_code = document.getElementById(menu_name).innerHTML;
					
					// the first line looks for the assembler.php?page=pagename format
					// the second line looks for the URL rewriting format
					// we're including both in the demo site but a real site would just need one or the other
					
					
					re = new RegExp("(\\W" + window.location + "\")", "gi") ;
					menu_code = menu_code.replace(re, "$1 class=\"active\"") ;
					//alert(re1);						 
					//menu_code = menu_code.replace(re1, "$1 class=\"current\""); 
					
					// put the modified menu code back into the containing div
					document.getElementById(menu_name).innerHTML = menu_code;
				},


				
				
				/**
				* @author      Jesse Boyer <contact@jream.com>
				* @copyright   Copyright (C), 2013 Jesse Boyer
				* @license     GNU General Public License 3 (http://www.gnu.org/licenses/)
				*              Refer to the LICENSE file distributed within the package.
				*
				* @link        http://jream.com
				* @version     0.1
				* 
				* Handles a standard form for an AJAX submission with JSON data.
				*
				* @param el The element name to use, eg: #form-name
				* @param success_text Display custom text
				* @param success_callback Pass a custom function to handle any return data (Must be json)
				*
				* @example:
				*   handle_form('#project-form', 'Profile successfully updated.', function(e) {
				*       alert(e)
				*   });
				*/
				handleForm : function (el, success_text, success_callback) {
				 
					$(el).submit(function(e) {;
						e.preventDefault();
						var url = $(this).attr('action');
						var postData = $(this).serialize();
						
						//$(el).parent().append('<i class="icon-spinner icon-spin orange bigger-125"></i>');
				
						$.post(url, postData, function(o) {
							
								if (o.success >= 1) { 
									// Display custom success text
									if (typeof success_text != 'undefined') {
										kwx.success('Success.');
									} 
									else
									{
										kwx.success(success_text);
									}
					
									
								} else {
									kwx.error(o.error);
									
								}
								
								// Run the callback
									if (typeof success_callback == 'function') {
										success_callback(o)
									}
							}, 'json');
						})
					},
					
					
					
					
					// ------------------------------------------------------------------------
		
			//this.__construct = function() {};
		
			// ------------------------------------------------------------------------
		
			success : function(msg) {
				var dom = $("#success");
				var output = '';
		
				if (typeof msg === 'undefined') {
					output = "Success";
				}
				else {
					output = msg
				}
				
				$('#err_msg').append('<div id="success" />');
				 $('#success').fadeIn('fast');
		
				$("#success").html(output);
				$("#success").show();
				setTimeout(function() {
					$("#success").fadeOut();
				}, 5000);
		
			},
		
			// ------------------------------------------------------------------------
		
			error : function(msg) {
				var dom = $("#error");
				var output = '';
		
				if (typeof msg == 'undefined') {
					output = "Error";
				}
		
				if (typeof msg == 'object') {
					for (var key in msg) {
						if (typeof msg[key] == 'object') {
							for (var _key in msg[key]) {
								output += msg[key][_key] + "<br />";
							}
						} else {
							output += msg[key] + "<br />";
						}
					}
				} else {
					output += msg;
				}
		
				 $('#err_msg').append('<div id="error"  />');
				 $('#error').fadeIn('fast');
					 
				$("#error").html(output)
				$("#error").show();
				setTimeout(function() {
					$("#error").fadeOut();
				}, 5000);
		
			},	
		
		
			dragDropResponse : function(res){
				if(typeof res !== 'undefined'){
					
					$('body').append('<div id="success"  />');
					setTimeout(function(){
						  $("#"+ res ).slideUp("slow", function () {});
					}, 2000);
					
				}				
			},
		
	    
	    
		saveDragDrop : function(el, url, res) {
			$("#" + el ).sortable({ opacity: 0.8, cursor: 'move', 
				update: function() {			
					var order = $(this).sortable("serialize") + '&update=update'; 
					$.post( url, order, function(theResponse){
						
						$("#"+ res ).html(theResponse);
						$("#"+ res).slideDown('slow');						
						kwx.dragDropResponse();
					}); 															 
				}								  
			});
		},
		
		
		
		hide : function(el){
			$('#'+el).hide();
			
		},
		
		show : function(el){
			$('#'+el).show();
			
		}
		
		
			
			
			
		
		///---------- END OF FUNCTIONS ------------------------------- 

	} 
}
   

     