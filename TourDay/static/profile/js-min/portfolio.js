function previewFile(e){const t=new FileReader;t.addEventListener("load",(function(){pic_preview.src=t.result}),!1),e&&t.readAsDataURL(e)}function isFileImage(e){return e&&["image/gif","image/jpeg","image/png","image/webp"].includes(e.type)}function add_post(e,t,n,d,o,l,s,a){like_btn_icon="/static/icon/like.png",dislike_btn_icon="/static/icon/like2.png",post_section=document.getElementById("post-section"),div_post=document.createElement("div"),div_post.setAttribute("class","post"),div_post.setAttribute("id","post-div-"+t),div_head=document.createElement("div"),div_head.setAttribute("class","post-head"),div_user_info=document.createElement("div"),div_user_info.setAttribute("class","user-info"),img=document.createElement("img"),img.setAttribute("class","user-img"),img.setAttribute("src",document.getElementById("pro_pic").src),span=document.createElement("span"),span.textContent=document.getElementById("name").textContent,div_date=document.createElement("div"),div_date.setAttribute("class","date-div"),span_date=document.createElement("span"),span_date.textContent=d,div_date.appendChild(span_date),null!=select_picture&&(i_delete=document.createElement("i"),i_delete.setAttribute("class","material-icons"),i_delete.textContent="delete",i_delete.addEventListener("click",()=>{delete_post(t)}),div_date.appendChild(i_delete)),div_body=document.createElement("div"),div_body.setAttribute("class","post-body"),p=document.createElement("p"),p.setAttribute("class","post-text"),p.textContent=n,div_img=document.createElement("div"),div_img.setAttribute("class","post-img"),img2=document.createElement("img"),img2.setAttribute("data-toggle","modal"),img2.setAttribute("data-target",".modal-image"),img2.setAttribute("id","post-image-"+t),img2.setAttribute("src",o),img2.addEventListener("click",()=>{document.getElementById("post-image-modal").src=o}),div_lower=document.createElement("div"),div_lower.setAttribute("class","lower"),div=document.createElement("div"),img3=document.createElement("img"),s?(img3.setAttribute("src",like_btn_icon),img3.setAttribute("data-is-liked","1")):(img3.setAttribute("src",dislike_btn_icon),img3.setAttribute("data-is-liked","0")),img3.setAttribute("id","like-btn-"+t),img3.setAttribute("class","like"),img3.addEventListener("click",e=>{is_liked=e.target.getAttribute("data-is-liked"),element=document.getElementById("like-btn-"+t),like_count_text=document.getElementById("like-count-"+t),"1"==is_liked?(element.setAttribute("src",dislike_btn_icon),element.setAttribute("data-is-liked","0"),like_count_text.textContent=parseInt(like_count_text.textContent)-1):(element.setAttribute("src",like_btn_icon),element.setAttribute("data-is-liked","1"),like_count_text.textContent=parseInt(like_count_text.textContent)+1),like_event(t)}),span1=document.createElement("span"),span1.setAttribute("id","like-count-"+t),span1.textContent=l,div_location=document.createElement("div"),div_location.setAttribute("class","location-div"),i=document.createElement("i"),i.setAttribute("class","material-icons"),i.textContent="location_on",span2=document.createElement("span"),span2.textContent=a,div_location.appendChild(i),div_location.appendChild(span2),div.appendChild(img3),div.appendChild(span1),div_lower.appendChild(div),div_lower.appendChild(div_location),div_img.appendChild(img2),div_body.appendChild(p),null!=o&&div_body.appendChild(div_img),div_body.appendChild(div_lower),div_user_info.appendChild(img),div_user_info.appendChild(span),div_head.appendChild(div_user_info),div_head.appendChild(div_date),div_post.appendChild(div_head),div_post.appendChild(div_body),e?post_section.appendChild(div_post):post_section.prepend(div_post)}let next;function get_post(e){fetch(e).then(e=>e.json()).then(e=>{next=e.next,post_loader.style.display="none",e.results.forEach(e=>{add_post(!0,e.id,e.post,e.date,e.image,e.likes.length,e.likes.includes(parseInt(document.getElementById("user-id").value)),e.location)})})}function like_event(e){form=new FormData,form.append("id",e),fetch("/like/",{method:"POST",body:form}).then(e=>e.json()).then(e=>{200!=e.status&&console.log("Like error.")})}function set_current_date(){Date.prototype.toDateInputValue=function(){var e=new Date(this);return e.setMinutes(this.getMinutes()-this.getTimezoneOffset()),e.toJSON().slice(0,10)},document.getElementById("date").value=(new Date).toDateInputValue()}function delete_post(e){form=new FormData,form.append("id",e),fetch("/delete_post/",{method:"POST",body:form}).then(e=>e.json()).then(t=>{200==t.status&&(elem=document.getElementById("post-div-"+e),elem.parentNode.removeChild(elem))})}function get_map_data(){user_id=document.getElementById("user-id").value,fetch("/visited/"+user_id).then(e=>e.json()).then(e=>{200==e.status&&e.visited.forEach(e=>{document.getElementById("path"+e).style.fill="#940808"})})}select_picture=document.getElementById("picture"),pic_btn=document.getElementById("pic-btn"),preview_div=document.getElementById("preview"),preview_close=document.getElementById("preview-close"),pic_preview=document.getElementById("pic_preview"),post_loader=document.getElementById("post-loder"),null!=select_picture&&(select_picture.addEventListener("change",()=>{const e=select_picture.files[0];isFileImage(e)?(previewFile(e),pic_btn.style.display="none",preview_div.style.display="block"):select_picture.value=""}),preview_close.addEventListener("click",()=>{pic_btn.style.display="block",preview_div.style.display="none",select_picture.value=""}),document.getElementById("post-btn").addEventListener("click",()=>{if(post=document.getElementById("add-post-text"),date=document.getElementById("date"),location_=document.getElementById("city"),file=select_picture.files[0],""==post.value||"null"==location_.value||null==file)return $("#error-msg").text("All fileds are required."),$(".error").show(),void hide_error();form=new FormData,form.append("post",post.value),form.append("date",date.value),form.append("location",location_.value),form.append("image",file),fetch("/add_post/",{method:"POST",body:form}).then(e=>e.json()).then(e=>{201==e.status?(add_post(!1,e.id,post.value.trim(),date.value,e.image,0,!1,e.location),preview_close.click(),post.value="",set_current_date(),get_map_data()):console.log("uploading error")})})),null!=next&&$(window).scroll((function(){$(window).scrollTop()+$(window).height()==$(document).height()&&(post_loader.style.display="flex",get_post(next))})),$(document).ready(()=>{username=document.getElementById("my-username").value,null!=select_picture&&set_current_date(),get_map_data(),get_post(`/get_post/${username}?format=json`)});