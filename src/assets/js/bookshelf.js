function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
       
      
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  
  document.getElementById('fullscreen').addEventListener('click', function() {
    toggleFullscreen();
  });




  $(function () {
 
    $('[data-toggle="tooltip"]').tooltip()
   
  })
  
  $('#fullscreen').click(function(e){
    $(this).find('i').toggleClass('fas fa-expand fa-fw  fas fa-minus fa-fw');
    $(this).attr("data-original-title", $(this).attr("data-original-title") == 'Exit from fullscreen mode' ? "Goto fullscreen mode" : "Exit from fullscreen mode" );
  });

 