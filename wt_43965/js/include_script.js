include('request_url.js');
//----jquery-plagins----
include('jquery-1.8.3.min.js');
include('jquery.ba-resize.min.js');
include('jquery.easing.js');
include('jquery.color.js');
include('jquery.image_resize.js');
include('jquery.cycle.all.min.js');
include('jcarousellite_1.0.1.min.js');
include('jquery.fancybox.pack.js');
include('jquery.mousewheel.js');
include('uScroll.js');
//----bootstrap----
include('panel_bootstrap.js');
include('jquery.cookie.js');
//----All-Scripts----
include('forms.js');
include('jquery.mobilemenu.js');
include('scroll_to_top.js');
include('ajax.js.switch.js');
include('script.js');
//----Include-Function----
function include(url){ 
  document.write('<script type="text/javascript" src="js/'+ url + '"></script>'); 
  return false ;
}