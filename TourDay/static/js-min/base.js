function validateEmail(e){return/\S+@\S+\.\S+/.test(e)}function validateUsername(e){return/^[a-zA-Z]{3}[a-z0-9_]*$/.test(e)}$(window).on("load",(function(){setInterval(()=>{$(".loader").hide(),$("body").css({overflow:"visible"})},1e3)}));let timeout=void 0;function getCookie(e){var t=null;if(document.cookie&&""!==document.cookie)for(var o=document.cookie.split(";"),l=0;l<o.length;l++){var n=o[l].trim();if(n.substring(0,e.length+1)===e+"="){t=decodeURIComponent(n.substring(e.length+1));break}}return t}function hide_error(){timeout=setTimeout(()=>$(".error").hide(),5e3)}function loader_progress(){return loader_length=0,document.getElementById("upper_loader").style.display="block",setInterval(()=>{document.getElementById("upper_loader").style.width=loader_length+"%",loader_length<80?loader_length+=.9:loader_length<85?loader_length+=.1:loader_length>92&&loader_length<101&&(loader_length+=.07)},1)}function clear_loader_progress(e){clearInterval(e),document.getElementById("upper_loader").style.display="none"}isCliked=!1,document.querySelector(".menu-icon").addEventListener("click",()=>{document.querySelector(".menu-icon").classList.toggle("active"),document.querySelector("#items").classList.toggle("open"),isCliked?(document.querySelector(".menu-mobile").classList.toggle("showNav"),document.querySelector(".menu-icon").classList.toggle("addColor"),isCliked=!1):(setTimeout(()=>{document.querySelector(".menu-mobile").classList.toggle("showNav")},130),document.querySelector(".menu-icon").classList.toggle("addColor"),isCliked=!0)}),$("#close-error").click((function(){$(".error").hide(),null!=timeout&&clearTimeout(timeout)}));