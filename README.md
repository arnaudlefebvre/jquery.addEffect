README
======

jquery.addEffect.js - 07/02/2011 - Arnaud Lefebvre - Using JQuery

What is jquery.addEffect.js
---------------------------

Jquery plugin which offers to add hide/show effects defined on one
element and fired by clicking hide/show areas.


Here is an example of how you can use the plugin.
-------------------------------------------------

```html
<html>

  <head>
  <style>
    .contents { width:70%; padding:10px; border:solid 1px #778899; }
    .contents, .contents * { margin:0 auto; }
    .title { width:50%; text-align:center; }
    .cvInfosEltClass1 { float:right; }
    .cvInfosEltClass1 { float:left; }
    hr { width:90%; color:#E0E0E0; border:0; border-top:1px solid #E0E0E0; margin:10px auto !important; }
    p { text-align:justify; width:50%; background-color:#F5F5F5; margin:10px auto !important; }
  </style>
  </head>

  <body>

    <div class="contents">

      <div class="title" >
        <span class="cvwhat">This a very good movie.</span>
        <span class="cvMoreEltClass">More infos ?</span>
        <span class="cvLessEltClass">Less infos ?</span>
      </div>
      <div id="cvwhat" class="cvInfosEltClass">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
      </div>

      <hr>

      <div class="title" >
        <span class="cvwhat1">This a very good movie.</span>
        <span class="cvMoreEltClass1">More infos ?</span>
        <span class="cvLessEltClass1">Less infos ?</span>
      </div>
      <div id="cvwhat1" class="cvInfosEltClass1">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
      </div>

      <hr>

      <div class="title" >
        <span class="cvwhat2">This a very good movie.</span>
        <span class="cvMoreEltClass2">More infos ?</span>
        <span class="cvLessEltClass2">Less infos ?</span>
      </div>
      <div id="cvwhat2" class="cvInfosEltClass2">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
      </div>

      <hr>

      <div class="title" >
        <span class="cvwhat3">This a very good movie.</span>
        <span class="cvM oreEltClass3">More infos ?</span>
        <span class="cvLessEltClass3">Less infos ?</span>
      </div>
      <div id="cvwhat3" class="cvInfosEltClass3">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
      </div>

    </div>

  <script src="js/jquery.js"></script>
  <script src="js/jquery.addeffect.js"></script>
  <script type="text/javascript">
    $(".cvInfosEltClass").addEffect({cvMoreEltClass:'.cvMoreEltClass',cvLessEltClass:'.cvLessEltClass',effect:'0',cvTime:'100000'});
    $(".cvInfosEltClass1").addEffect({cvMoreEltClass:'.cvMoreEltClass1',cvLessEltClass:'.cvLessEltClass1',effect:'1',cvTime:'50000',hiddingTime:'2000'});
    $(".cvInfosEltClass2").addEffect({cvMoreEltClass:'.cvMoreEltClass2',cvLessEltClass:'.cvLessEltClass2',effect:'2',cvTime:'12550'});
    $(".cvInfosEltClass3").addEffect({cvMoreEltClass:'.cvMoreEltClass3',cvLessEltClass:'.cvLessEltClass3'});
  </script>
  </body>

</html>
```
