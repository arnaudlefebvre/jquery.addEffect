/************************************************************************************************************************************/
/* addEffect.js - 07/02/2011 - Arnaud Lefebvre - Using JQuery												*
/* 																						*
/* This script allow you add JQuery effects on elements defining												*
/* one or more configurations.                                                                                                      *
/* Let info the elements on which the plugin is applied 													*
/* These configurations have to be set with 5 elements :													*														*
/* - more  //Class of elements on which a click show info													*
/* - less  //Class of elements on which a click hide info													*
/* - effect			 //Effect which be applied when displaying or hidding info                                                  *
/* - time			 //Duration in millisecond of the effect when displaying info                                               *
/* - hiddingTime (optionnal) //Duration in millisecond of the effect when hidding info                                              *
/*                                                                                                                                  *
/************************************************************************************************************************************/

(function($) {
    $.fn.addEffect = function(options) {

        /**
         *Constants
         *
         **/
        function Constants() {
            this.Constants = Constants.EFFECTS.none;
        }

        Constants.EFFECT_TAB = {
            effect : new Array(
                new Array("slideUp","slideDown"),
                new Array("fadeIn","fadeOut"),
                new Array("toogle","toogle"),
                new Array("hide","show")
            )
        }
        Constants.EFFECT_TAB.effect["slide"] = new Array("slideUp","slideDown");
        Constants.EFFECT_TAB.effect["fade"] = new Array("fadeOut","fadeIn");
        Constants.EFFECT_TAB.effect["toogle"] = new Array("toogle","toogle");
        Constants.EFFECT_TAB.effect["hide"] = new Array("hide","show");
        Constants.EFFECT_TAB.effect["show"] = new Array("hide","show");

        Constants.EFFECTS = {
            none : 3,
            slide : 0,
            fade: 1,
            toggle : 2,
            time : "800",
            hiddingTime : "300"
        }

        Constants.CONF = {
            current : Array()
        }

        Constants.GLOBAL = {
            nbconf : 0
        };

        function getNumberOfMoreElements(more,affected) {
            var error = $(more).length() % $(affected).length();
            if (error != 0) {
                throw new Error("Error : There is missing HTML tags or bad configuration.");
            }
            else {
                return $(more).length() / $(affected).length();
            }
        }

        function getNumberOfLessElements(less,affected) {
            var error = $(less).length() % $(affected).length();
            if (error != 0) {
                throw new Error("Error : There is missing HTML tags or bad configuration.");
            }
            else {
                return $(less).length() / $(affected).length();
            }
        }

        /**
         *Effect class
         *
         *
         **/
        function Effect() {
            this.up = Constants.EFFECTS.none;
            this.down = Constants.EFFECTS.none;

             if( typeof Effect.initialized == "undefined" ) {
                /**toString() function
                 */
                Effect.prototype.toString = function() {
                    return "effectDown : "+this.down+"\neffectUp : "+this.up;
                };

                /**Convert any var which is number into Number
                 * @return number
                 * @throws Exception
                 **/
                Effect.prototype.toNumber = function(effect) {
                    if (isNaN(effect*1)==false)
                        effect = effect*1
                    return effect;
                }

                /**Set the effect properties.
                 *
                 * @param effect, String or number, defines which effects will be applied for
                 *              showing or hidding elements.
                 **/
                Effect.prototype.setEffect = function(effect) {
                    effect = this.toNumber(effect);
                    if (typeof effect == 'number' && effect < Constants.EFFECT_TAB.effect.length ) {
                        this.up = Constants.EFFECT_TAB.effect[effect][0];
                        this.down = Constants.EFFECT_TAB.effect[effect][1];
                    }
                    else if (typeof effect == 'string') {
                        try {
                            this.up = Constants.EFFECT_TAB.effect[effect.toLowerCase()][0];
                            this.down = Constants.EFFECT_TAB.effect[effect.toLowerCase()][1];
                        } catch (e) {
                            throw new Error("Specified effect is unknown (effect:"+effect.toLowerCase()+"). Please check configuration.");
                        }
                    }
                    else
                        throw new Error("Specified effect is unknown (effect:"+effect+"). Please check configuration.");
                };


             Effect.initialized = true;
             }
        }

        /**Configuration class
         * Class in which we save elements and effect to apply.
         * On each call of jquery.addEffect one Configuration is
         * instaciated.
         *
         *
         **/
        function Configuration() {
            this.more = "";
            this.nbMore = 1;
            this.less = "";
            this.nbLess = 1;
            this.info = "";
            this.effect = new Effect();
            this.time = Constants.EFFECTS.none;
            this.hiddingTime = Constants.EFFECTS.hiddingTime;
            this.current = null;
            this.idx = 0;

            if( typeof Configuration.initialized == "undefined" ) {
                 //toString() function
                Configuration.prototype.toString = function() {
                    return "Configuration : \nmore = "+this.more+
                        ",\nbMore = "+this.nbMore+
                        ",\nless = "+this.less+
                        ",\nbLess = "+this.nbLess+
                        ",\ninfo = "+this.info+
                        ",\neffectUp = "+this.effectUp+
                        ",\neffectDown = "+this.effectDown+
                        ",\ntime = "+this.time;
                };

                Configuration.prototype.setEffect = function(effect) {
                    this.effect.setEffect(effect);
                };

                Configuration.initialized = true;
            }
        }

        /****************************************
         *Defaults vars :
         *more : ".more",
         *less : ".less",
         *info : "info",
         *effect : Constants.EFFECTS.toggle,
         *time : "800",
         *hiddingTime : "300"
         *****************************************/
        var defaults = {
            more : ".more",
            less : ".less",
            info : ".info",
            effect : Constants.EFFECTS.toggle,
            time : Constants.EFFECTS.time,
            hiddingTime : Constants.EFFECTS.hiddingTime,
            nbLess : 1,
            nbMore : 1
        }
        //Mix defaults vars and user vars
        var opts = $.extend(defaults, options);

        /*Define vars for configuration */
        config0 = new Configuration();
        config0.more = opts.more;
        config0.less = opts.less;
        config0.info = "."+this[0].className;
        config0.setEffect(opts.effect);
        config0.time = opts.time;
        config0.hiddingTime = opts.hiddingTime;
        config0.nbLess = opts.nbLess;
        config0.nbMore = opts.nbMore;
        config0.idx = Constants.GLOBAL.nbconf;
        Constants.CONF.current[Constants.GLOBAL.nbconf] = config0;

        /*Hide elements */
        $(Constants.CONF.current[Constants.GLOBAL.nbconf].less).hide();
        $(this).hide();

        /*For each elements $(this), add effects on involved elements*/
         $(this).each(function(index) {
            var currentConfig = Constants.CONF.current[Constants.CONF.current[Constants.GLOBAL.nbconf].idx];
            for (var itm = 0; itm < currentConfig.nbMore ; itm++) {
                $(currentConfig.more+':eq('+((index*currentConfig.nbMore)+itm)+')').css('cursor','pointer');
                $(currentConfig.more+':eq('+((index*currentConfig.nbMore)+itm)+')').click(function(){
                    $(currentConfig.info+':eq('+index+')')[currentConfig.effect.down](currentConfig.time,function(){
                        for (var i = 0; i < currentConfig.nbMore; i++) {
                            $(currentConfig.more+':eq('+((index*currentConfig.nbMore)+i)+')').hide();
                        }
                        for (var j = 0; j < currentConfig.nbLess ; j++) {
                            $(currentConfig.less+':eq('+((index*currentConfig.nbLess)+j)+')').show().css('cursor','pointer');
                        }
                    })
                });
            }

            for (var it = 0; it < currentConfig.nbLess ; it++) {
                $(currentConfig.less+':eq('+((index*currentConfig.nbLess)+it)+')').click(function(){
                    $(currentConfig.info+':eq('+index+')')[currentConfig.effect.up](currentConfig.time,function(){
                        for (var k = 0; k < currentConfig.nbLess ; k++) {
                            $(currentConfig.less+':eq('+((index*currentConfig.nbLess)+k)+')').hide();
                        }
                        for (var l = 0; l < currentConfig.nbMore; l++) {
                            $(currentConfig.more+':eq('+((index*currentConfig.nbMore)+l)+')').show().css('cursor','pointer').focus();
                        }
                    })
                });
            }
         })
        Constants.GLOBAL.nbconf++;
        return $(this);
    };
})(jQuery);

