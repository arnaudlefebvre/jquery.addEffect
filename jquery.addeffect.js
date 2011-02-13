/********************************************************************************************************************************
/* addEffect.js - 07/02/2011 - Arnaud Lefebvre - Using JQuery																*
/* 																																*
/* This script allow you add JQuery effects on elements defining																*
/* one or more configuration. 																									*
/* These configurations have to be set with 7 elements :																		*
/* - cvTitleEltClass //Class of elements which is the title (not really used now but required)									*
/* - cvInfosEltClass //Class of elements which contains more informations														*
/* - cvMoreEltClass  //Class of elements on which a click show cvInfosEltClass													*
/* - cvLessEltClass  //Class of elements on which a click hide cvInfosEltClass													*
/* - effect			 //Effect which be apply when displaying or hidding cvInfosEltClass											*
/* - time			 //Duration in millisecond of the effect when displaying cvInfosEltClass									*
/* - hiddingTime (optionnal) //Duration in millisecond of the effect when hidding cvInfosEltClass								*
/*																																*
/********************************************************************************************************************************
/*
/* Here is an example of how to use the script :
/*
/* <html>
/* 	<head>
/* 		<script src="js/jquery.js"></script>
/*		<style>
/*			.cvInfosEltClass1 { float:right;}
/*			.cvInfosEltClass1 { float:left;}
/*		</style>
/* 	</head>
/* 	<body>
/* 		<table>
/* 			<tr>
/* 				<td><div id="cvwhat" class="cvwhat">This a very good movie.</div></td>
/* 				<td><span class="cvMoreEltClass">More infos ?</span>
/* 				<td><span class="cvLessEltClass">Less infos ?</span></td>
/*			</tr>
/* 		</table>
/*		<div class="cvInfosEltClass">
/*			This bloc contains more information
/*			about this very good movie.
/*		</div>
/*
/*		<table>
/* 			<tr>
/* 				<td><div id="cvwhat1" class="cvwhat1">This a very good movie.</div></td>
/* 				<td><span class="cvMoreEltClass1">More infos ?</span>
/* 				<td><span class="cvLessEltClass1">Less infos ?</span></td>
/*			</tr>
/* 		</table>
/*	<div class="cvInfosEltClass1">
/*		This bloc contains more information
/*		about this very good movie.
/*	</div>
/*
/*	<br />
/*	<span id="cvwhat2" class="cvwhat2">This a very good movie.</span>
/*	<span class="cvMoreEltClass2">More infos ?</span>
/*	<span class="cvLessEltClass2">Less infos ?</span>
/*	<span class="cvInfosEltClass2">
/*		This bloc contains more information
/*		about this very good movie.
/*	</span>
/*
/* 	</body>
/*	<script src="js/jquery.js"></script>
/*      <script src="js/jquery.cvscriptplugin.js"></script>
/* 	<script type="text/javascript">
/*
/* 	$("#cvwhat").hideOrShowClassPlugin({cvMoreEltClass:'.cvMoreEltClass',cvLessEltClass:'.cvLessEltClass',cvInfosEltClass:'.cvInfosEltClass'});
/* 	$("#cvwhat1").hideOrShowClassPlugin({cvMoreEltClass:'.cvMoreEltClass1',cvLessEltClass:'.cvLessEltClass1',cvInfosEltClass:'.cvInfosEltClass1'});
/* 	$("#cvwhat2").hideOrShowClassPlugin({cvMoreEltClass:'.cvMoreEltClass2',cvLessEltClass:'.cvLessEltClass2',cvInfosEltClass:'.cvInfosEltClass2'});
/*
/*      </script>
/* </html>
/****************************************************************************************************/
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

            if( typeof Configuration.initialized == "undefined" ) {
                 //toString() function
                Configuration.prototype.toString = function() {
                    return "Configuration : \ncvMoreEltClass = "+this.cvMoreEltClass+",\ncvLessEltClass = "+this.cvLessEltClass+",\ncvInfosEltClass = "+this.cvInfosEltClass+",\neffect = "+this.effect+",\ncvtime = "+this.time;
                };
                Configuration.initialized = true;
            }
        }

        // définition des paramètres par défaut
        /****************************************
         *Variable par defauts :
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
        // mélange des paramètres fournis et des paramètres par défaut
        var opts = $.extend(defaults, options);
        
        /*Définitions des var */
        config0 = new Configuration();
        config0.cvMoreEltClass = opts.cvMoreEltClass;
        config0.cvLessEltClass = opts.cvLessEltClass;
        config0.cvInfosEltClass = opts.cvInfosEltClass;
        config0.effect = opts.effect;
        config0.time = opts.cvTime;
        config0.hiddingTime = opts.hiddingTime;
        config0.idx = Constants.GLOBAL.nbconf;
        Constants.CONF.current[Constants.GLOBAL.nbconf] = config0;

        /***************/
        /*test var OK !*/

        /*On cache les elements */
        $(Constants.CONF.current[Constants.GLOBAL.nbconf].cvLessEltClass).hide();
        $(this).slideUp(1);
        
        /*Pour chacun des elts $(this) on ajout les effets sur les élements qui le concerne */
         $(this).each(function(index, infosElement) {
            var idx = Constants.CONF.current[Constants.GLOBAL.nbconf].idx;
            Constants.CONF.current[idx].cvInfosEltClass = infosElement;
            $(Constants.CONF.current[idx].cvMoreEltClass+':eq('+index+')').css('cursor','pointer');
            if (Constants.CONF.current[idx].effect == Constants.EFFECTS.slide) {
                $(Constants.CONF.current[idx].cvMoreEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx].cvInfosEltClass).slideDown(Constants.CONF.current[idx].time,function(){
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').show().css('cursor','pointer');
                    })
                });

                $(Constants.CONF.current[idx].cvLessEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx].cvInfosEltClass).slideUp(Constants.CONF.current[idx].time,function(){
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').show().css('cursor','pointer');
                    })
                });
            }
            else if (Constants.CONF.current[idx].effect == Constants.EFFECTS.fade) {
                $(Constants.CONF.current[idx].cvMoreEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx].cvInfosEltClass).fadeIn(Constants.CONF.current[idx].time,function(){
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').show().css('cursor','pointer');
                    })
                });

                $(Constants.CONF.current[idx].cvLessEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx].cvInfosEltClass).fadeOut(Constants.CONF.current[idx].time,function(){
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').show();
                    })
                });
            }
            else if (Constants.CONF.current[idx].effect == Constants.EFFECTS.toggle) {
                $(Constants.CONF.current[idx].cvMoreEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx].cvInfosEltClass).toggle(Constants.CONF.current[idx].time,function(){
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').show().css('cursor','pointer');
                    })
                });

                $(Constants.CONF.current[idx].cvLessEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx].cvInfosEltClass).toggle(Constants.CONF.current[idx].time,function(){
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').show();
                    })
                });
            }
            else if (Constants.CONF.current[idx].effect == Constants.EFFECTS.none) {
                $(Constants.CONF.current[idx].cvMoreEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx].cvInfosEltClass).show(Constants.CONF.current[idx].time,function(){
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').show().css('cursor','pointer');
                    })
                });

                $(Constants.CONF.current[idx].cvLessEltClass+':eq('+index+')').click(function(){
                    var idx0 = idx;
                    $(Constants.CONF.current[idx].cvInfosEltClass).hide(Constants.CONF.current[idx].time,function(){
                        $(Constants.CONF.current[idx0].cvLessEltClass+':eq('+index+')').hide();
                        $(Constants.CONF.current[idx0].cvMoreEltClass+':eq('+index+')').show();
                    })
                });
            }
         })

         //Regexp pour .animate
         //\{(.)+},|\s*(['a-zA-Z-0-9()]+),|\S*(function\(\)(\s)*\{(.*)\})++

        //var hideOrShowClass = new HideOrShowClass();

        /**AJOUT D'UNE CONFIGURATION**/
        /*hideOrShowClass.cvMoreEltClass = opts.cvMoreEltClass;
        hideOrShowClass.cvLessEltClass = opts.cvLessEltClass;
        hideOrShowClass.cvInfosEltClass = opts.cvInfosEltClass;
        hideOrShowClass.effect = opts.effect;
        hideOrShowClass.cvTime = opts.cvTime;
        /** FIN AJOUT D'UNE CONFIGURATION **/

        /*hideOrShowClass.setUp();

        hideOrShowClass.addEffects();
*/
        Constants.GLOBAL.nbconf++;
        return $(this);
    };
})(jQuery);

