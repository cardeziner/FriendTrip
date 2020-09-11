// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require_tree .
//= require lodash

$(function(){ $(document).foundation(); });

// $(function loadJS(src) {
//   let ref = window.document.getElementsByTagName("script")[0];
//   let script = window.document.createElement("script");
//   script.src = src;
//   script.async = true;
//   ref.parentNode.insertBefore(script, ref);
// })
