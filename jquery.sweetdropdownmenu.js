/**
 * TruncateIt
 * Copyright (c) 2011 Chris Olsen [olsen.chris@gmail.com]
 * 
 * Licensed under the MIT license.
 * 
 * .menu
 *   .menu-title
 *   .menu-panel
 *     a
 *
 * Ex.
 * <div id="binding_id_or_class">
 *   <div class="menu">
 *     <a href="#" class="menu-title">Some Label</a>
 *     <ul class="menu-panel">
 *       <li><a href="some_url">Link 1</a></li>
 *       <li><a href="some_url">Link 2</a></li>
 *     </ul>
 *   </div>
 * </div>
 *
 * <script type="text/javascript">
 *   $("#binding_id_or_class").sweetDropDownMenu();
 *   $("#binding_id_or_class").sweetDropDownMenu({
 *     toggleMenuCss: true // will set the clicked menu css class menu-item-active
 *   });
 * </script>
 **/    

(function($) {
  $.fn.sweetDropDownMenu = function(customSettings) {
    // options setup
    if (customSettings == null)
      customSettings = {};

    // defaults
    var menuTimeoutId = null;
    var settings = $.extend({
      toggleMenuCss: false
    }, customSettings);

    // helper method
    var hideMenu = function(menu) {
      menuTimeoutId = setTimeout(function() {
        var menu_panel = menu.find(".menu-panel");
        menu_panel.hide();
	      if (settings.toggleMenuCss) {
          var menu_title = menu.find(".menu-title-active");
          menu_title
            .removeClass("menu-title-active")
            .addClass("menu-title");
        }
      }, 300);
    };

    // plugin method
    return this.each(function() {
      $(this).addClass("sweet-drop-down-menu");
      $(this).find(".menu-title").click(function() {
	      // show clicked menu
	      var currentMenu = $(this);
	      if (settings.toggleMenuCss) {
	        currentMenu 
            .removeClass("menu-title")
            .addClass("menu-title-active");
	      }
	      
	      currentMenu.siblings().show();
	      return false;
      });

      // hide menu on menu item blur
      $(this).find(".menu-title").mouseout(function() {
	      hideMenu( $(this).parent() ); 
      });

      // prevent hiding of the menu after hover over menu
      $(this).find(".menu-panel").mouseenter(function() {
	      if (menuTimeoutId != null) {
	        clearTimeout(menuTimeoutId);
	        menuTimeoutId = null;
	      }
      });

      // hide menu when leaving menu
      $(this).find(".menu-panel").mouseleave(function() {
	      hideMenu( $(this).parent() ); 
      });

      // hide menu after clicking a link
      $(this).find(".menu-panel a").click(function() {
	      hideMenu( $(this).closest(".menu") );
      });

    }); // plugin method
  }; // sweetDropDownMenu()

})(jQuery);
