
/* This code is used to run as soon as Intel activates */
var onDeviceReady=function(){
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    
    $('#home_title').hide();
    $('#welcome_msg').hide();
    $('#btn_get_continue').hide();
    
    
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);


/*================================================= XDK CODE ENDS =========================================== */



function animateHomeEle(){
    
    $('#home_title').show();
    $('#welcome_msg').show();
    $('#welcome').animate({width:'300px', height: '200px'})
    
    el = '#btn_get_started';
    $(el).hide();
    $('#btn_get_continue').show();
    
     //load data from the server to populate database
     var obj = [{"slug":"mobile-page"}] // kwx.formData('#frm_tst');
  
    kwx.amfServiceCallParam('PageService', 'pgContent', obj,  function callback(data){
            $('#welcome_msg').html(data.post_content);
    });
   
}

