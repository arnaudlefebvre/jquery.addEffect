/********************************************************************************************************************************
/* addEffect.js - 07/02/2011 - Arnaud Lefebvre - Using JQuery																*
/* 																																*
/* This script allow you add JQuery effects on elements defining																*
/* one or more configurations. 																									*
/* These configurations have to be set with 5 elements :																		*														*
/* - cvMoreEltClass  //Class of elements on which a click show cvInfosEltClass													*
/* - cvLessEltClass  //Class of elements on which a click hide cvInfosEltClass													*
/* - effect			 //Effect which be applied when displaying or hidding cvInfosEltClass											*
/* - time			 //Duration in millisecond of the effect when displaying cvInfosEltClass									*
/* - hiddingTime (optionnal) //Duration in millisecond of the effect when hidding cvInfosEltClass								*
/*																																*
/********************************************************************************************************************************/

function Constants() {
    this.Constants = Constants.EFFECTS.none;
}

Constants.EFFECTS = {
    none : -1,
    slide : 0,
    fade: 1,
    toggle : 2,
    cvTime : "800",
    hiddingTime : "300"
}

Constants.ELEMENTS = {
    title : "title",
    more : "more",
    less : "less",
    infos : "infos",
    clmore : "clmore",
    cltitle : "cltitle",
    clless : "clless",
    clinfos : "clinfos"
}

Constants.CONF = {
    current : Array()
}

Constants.GLOBAL = {
    nbElementsMax : 100,
    identifier : "_",
    clend : "AZBYCX",
    nbconf : 0
};

(function($) {
    $.fn.addEffect = function(options) {

        function Configuration() {
            this.cvMoreEltClass = "";
            this.cvLessEltClass = "";
            this.cvInfosEltClass = "";
            this.effect = Constants.EFFECTS.none;
            this.time = Constants.EFFECTS.none;
            this.hiddingTime = Constants.EFFECTS.hiddingTime;
            this.idx = 0;
            this.current = null;

            if( typeof Configuration.initialized == "undefined" ) {
                 //toString() function
                Configuration.prototype.toString = function() {
                    return "Configuration : \ncvMoreEltClass = "+this.cvMoreEltClass+",\ncvLessEltClass = "+this.cvLessEltClass+",\ncvInfosEltClass = "+this.cvInfosEltClass+",\neffect = "+this.effect+",\ncvtime = "+this.time;
                };
                Configuration.initialized = true;
            }
        }

        // Definition of defaults variables
        /****************************************
         *Defaults vars :
         *cvMoreEltClass : ".cvMoreEltClass",
         *cvLessEltClass : ".cvLessEltClass",
         *cvInfosEltClass : "cvInfosEltClass",
         *effect : Constants.EFFECTS.toggle,
         *time : "-1",
         *hiddingTime : "-1"
         *****************************************/
        var defaults = {
            cvMoreEltClass : ".cvMoreEltClass",
            cvLessEltClass : ".cvLessEltClass",
            cvInfosEltClass : ".cvInfosEltClass",
            effect : Constants.EFFECTS.toggle,
            time : Constants.EFFECTS.cvTime,
            hiddingTime : Constants.EFFECTS.hiddingTime,
            cvTitleEltClass : ".cvTitleEltClass"
        }
        //Mix defaults vars and user vars
        var opts = $.extend(defaults, options);

        /*Define vars for configuration */
        config0 = new Configuration();
        config0.cvMoreEltClass = opts.cvMoreEltClass;
        config0.cvLessEltClass = opts.cvLessEltClass;
        config0.cvInfosEltClass = "."+this[0].className;
        config0.current = null;
        config0.effect = opts.effect;
        config0.time = opts.cvTime;
        config0.hiddingTime = opts.hiddingTime;
        config0.idx = Constants.GLOBAL.nbconf;
        Constants.CONF.current[Constants.GLOBAL.nbconf] = config0;

         /*We hide elements */
        $(Constants.CONF.current[Constants.GLOBAL.nbconf].cvLessEltClass).hide();
        $(this).slideUp(1);

        /*For each elements $(this), we add effects on involved elements*/
         $(this).each(function(index, infosElement) {
            var idx = Constants.CONF.current[Constants.GLOBAL.nbconf].idx;
            Constants.CONF.current[idx].current = infosElement;
            $(Constants.CONF.current[idx].cvMoreEltClass+':eq('+index+')').css('cursor','pointer');
            if (Constants.CONF.current[idx].effect == Constants.EFFECTS.slide) {
                $(Constants.CONF.current[idx].cvMoreEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx0].cvInfosEltClass+':eq('+index+')').slideDown(Constants.CONF.current[idx0].time,function(){
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').show().css('cursor','pointer');
                    })
                });

                $(Constants.CONF.current[idx].cvLessEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx0].cvInfosEltClass+':eq('+index+')').slideUp(Constants.CONF.current[idx0].time,function(){
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').show().css('cursor','pointer');
                    })
                });
            }
            else if (Constants.CONF.current[idx].effect == Constants.EFFECTS.fade) {
                $(Constants.CONF.current[idx].cvMoreEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx0].cvInfosEltClass+':eq('+index+')').fadeIn(Constants.CONF.current[idx0].time,function(){
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').show().css('cursor','pointer');
                    })
                });

                $(Constants.CONF.current[idx].cvLessEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx0].cvInfosEltClass+':eq('+index+')').fadeOut(Constants.CONF.current[idx0].time,function(){
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').show();
                    })
                });
            }
            else if (Constants.CONF.current[idx].effect == Constants.EFFECTS.toggle) {
                $(Constants.CONF.current[idx].cvMoreEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx0].cvInfosEltClass+':eq('+index+')').toggle(Constants.CONF.current[idx0].time,function(){
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').show().css('cursor','pointer');
                    })
                });

                $(Constants.CONF.current[idx].cvLessEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx0].cvInfosEltClass+':eq('+index+')').toggle(Constants.CONF.current[idx0].time,function(){
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').show();
                    })
                });
            }
            else if (Constants.CONF.current[idx].effect == Constants.EFFECTS.none) {
                $(Constants.CONF.current[idx].cvMoreEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx0].cvInfosEltClass+':eq('+index+')').show(Constants.CONF.current[idx0].time,function(){
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').show().css('cursor','pointer');
                    })
                });

                $(Constants.CONF.current[idx].cvLessEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx0].cvInfosEltClass+':eq('+index+')').hide(Constants.CONF.current[idx0].time,function(){
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').show();
                    })
                });
            }
         })

        Constants.GLOBAL.nbconf++;
        return $(this);
    };
})(jQuery);
