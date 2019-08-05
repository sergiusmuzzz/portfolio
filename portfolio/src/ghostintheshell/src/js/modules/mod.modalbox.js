/*******
  Modal Box( w/ Class Based Revealing Module Pattern )
  
  ------ How to create modal box with event handler
    
    <button type="button" data-target-m-modal="1stModal">
      Launch 1st Modal
    </button>


    <div class="m-modal 1st" data-m-modal="1stModal">
      <div class="m-modal__container">

      </div>
      <div class="m-modal__close-icon m-modal__close-icon--left">X</div>
    </div>


  ------ To pass options.

    $('.m-modal.1st').modalBox({
      beforeOpen: function(){ thisModalBox, closeButton },
      afterClose: function(){ thisModalBox, closeButton },
      dev: true
    })

  ------ Available Methods for each modal box.

    To open modal box manually
    $('.m-modal.1st').modalBox('open'); 

    To close modal box manually
    $('.m-modal.1st').modalBox('close');

    To test if Class works property. ( for dev purpose )
    $('.m-modal.1st').modalBox('test');
   
*******/

var app = app || {}; 

(function(){

  'use strict';

  // =======================
  // Class
  // =======================


  /*******
    Constructor
  *******/

  // var modal1 = new ModalBox.init( $('.m-modal').eq(0) );

  var ModalBox = function ModalBox( thisElem, options ){

    this.options = options;
    this.$modalBox = thisElem;
    this.$close = thisElem.find('.m-modal__close-icon');
    this.isModalActive = false;

  }

  ModalBox.defaultOption = { 

    beforeOpen: null,
    afterClose: null,
    dev: false

  };

  /*******
    Static Function : Create instance and init plugin.
  *******/

  ModalBox.init = function( thisElem, options ){
    var modalBoxInstance = new ModalBox( thisElem, options );
    // modalBoxInstance.pluginInit();

    // if options.dev has true, open modalbox right away on load.
    if ( modalBoxInstance.options.dev ) {
      modalBoxInstance.open();
    }

    return modalBoxInstance;

  }


  /*******
    Instance Methods
  ********/

  ModalBox.prototype = function(){

    /**
      Plugin Init:
    **/
 
    var pluginInit = function(){

      ui.init.call(this);

      // var plugin = this;
      // var $triggeringElement = '[data-target-m-modal="' +this.$modalBox.attr('data-m-modal') + '"]';

      // // Watch any triggering elements are clicked, if clicked init UI.
      // $( $triggeringElement ).on( 'click', function( e ) {
        
      //   ui.init.call(plugin);

      //   e.preventDefault();
      //   e.stopPropagation();

      // } );

    }


    /**
      UI
    **/

    var ui = { 

      init: function(){ 

        ui.addEvtHandler.call(this);
        ui.actions.openModal.call(this);
        if ( this.options.beforeOpen ) {
          this.options.beforeOpen( this.$modalBox, this.$close );
        }

        $('body').addClass('modalbox-active');
        ui.actions.putHeight.call(this);

      },

      addEvtHandler: function(){
        var
          plugin = this,
          action = 'touchend click',
          browserAction = 'resize orientationchange';

        // prototype.call() invoke right away. and bind returns a function.
        // So I reassigned function with 'this' context so that I can destory this plugin event ( ui.actions.putHeight ) only to window later when modal is closed.

        ui.actions.putHeight = ui.actions.putHeight.bind(plugin);

        $(window).on( browserAction, ui.actions.putHeight );

        this.$close.on( action, function(){
          ui.actions.closeModal.call(plugin);
        })

      },

      actions: { 
        openModal: function openModal(){
          
          if( !this.isModalActive ) { 
            this.$modalBox.addClass('active');
            this.isModalActive = true;
          }
          
          var clientHeight = $( window ).height();

        },

        closeModal: function closeModal(){

          var $thisModalBox = this.$modalBox;

          if( this.isModalActive ) { 
            $thisModalBox.addClass('disappear').removeClass('active');
            this.isModalActive = false;
            setTimeout(function(){
              $thisModalBox.removeClass('disappear');
            }, 480)
          }

          if ( this.options.afterClose ) {
            this.options.afterClose( $thisModalBox, this.$close );
          }

          $('body').removeClass('modalbox-active');

          ui.actions.destroy.call(this);

        },

        // Need to put height so that modal box can be scrollable when viewport is smaller than modal box's height.
        putHeight: function putHeight(){

          var clientHeight = app.utility.winHeight();
          this.$modalBox.css('height', clientHeight);

        },

        destroy: function destroy(){

          this.$close.off('touchend click');
          $(window).off('resize orientationchange', ui.actions.putHeight );

        }

      },

      components: {

      },

      test: function(){
        console.log(this.$modalBox);
      }

    }

    /**
      Public Methods
    
    **/

    return {

      open: pluginInit,
      close: ui.actions.closeModal,
      test: ui.test

    }

  }();

  // Person.prototype.sayHi = function(){
  //   console.log(this.name);
  //   return this;
  // }


  // =======================
  // Modal Box Class Initiator.
  // =======================

  function Plugin(option, triggeredElement ){

    // this is $ selector
    // this.each() is added because modalBox() might be triggered with multiful elements => $(modalBox-elements).modalBox()
    this.each(function () {

      var 
        $this   = $(this),
        ModalBoxData = $this.data('_modalBox'),
        options = {};

      // if option is actual option with obj
      if( typeof option == 'object' && option ){
        options = $.extend( {}, ModalBox.defaultOption, option );
      }

     
      // If there is no ModalBox Class in this element's data as _modaBox.
      // Creat Class(Instance) and store it to data as this element's data as _modaBox

      if ( !ModalBoxData ) {
        $this.data('_modalBox', ( ModalBoxData = ModalBox.init( $this, options) ) )
      }

      // if this function is triggered by event listener. Activate modalBox and Show it.
      // Otherwise ( $('.modal').modalBox({ option }) ) only activate modalBox to pass options for the future use.
      if (triggeredElement){
        ModalBoxData.open()
      }

      // if option argument is 'string', look for public methods that are returned from ModalBox Class.
      if( typeof option == 'string' ){
        ModalBoxData[option]();
      }

      // ** manually
      // $('[data-m-modal="firstModal"]').data('_modalBox').open()

      // ** pretty
      // $('.m-modal.1st').modalBox('open');

    })
    
  }

  //  Add this Plugin to jQuery's prototype as 'modalBox'
  $.fn.modalBox = Plugin;
  $.fn.modalBox.Constructor = ModalBox;


  // =======================
  // Evnet Handler to trigger modalBox
  // =======================

  $('[data-target-m-modal]').on('click', function (e) {
    var 
      $this = $(this),
      $target = $( '[data-m-modal="' + $this.attr('data-target-m-modal') + '"]' ),
      option = {};

    if ( $this.is('a') ) e.preventDefault();

    Plugin.call( $target, option, this );

  })

})();


// $('.m-modal').modalBox({
//   beforeOpen: function( thisModal, closeButton ){ console.log(thisModal) },
//   afterClose: function( thisModal, closeButton ){ console.log(closeButton)},
//   dev: false
// })
 


