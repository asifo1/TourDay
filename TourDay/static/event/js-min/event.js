function isFileImage(e){return e&&["image/gif","image/jpeg","image/png","image/webp"].includes(e.type)}function previewFile(e){const t=new FileReader;t.addEventListener("load",(function(){pic_preview.src=t.result}),!1),e&&t.readAsDataURL(e)}function copy_url(){var e=document.createElement("input"),t=window.location.href;document.body.appendChild(e),e.value=t,e.select(),document.execCommand("copy"),document.body.removeChild(e)}function add_going(e,t,n,d){a=document.createElement("a"),a.setAttribute("href","/u/"+e),div=document.createElement("div"),div.setAttribute("class","travelers"),img_=document.createElement("img"),img_.setAttribute("src",t),h5_1=document.createElement("h5"),h5_1.textContent=n,h5_2=document.createElement("h5"),h5_2.textContent=d,div.appendChild(img_),div.appendChild(h5_1),div.appendChild(h5_2),a.appendChild(div),document.getElementById("going-list").appendChild(a),counter=document.getElementById("going-count"),counter2=document.getElementById("going-count-2"),counter.textContent=parseInt(counter.textContent)+1,counter2.textContent=counter.textContent}function hide_pending(e){document.getElementById("pending-"+e).style.display="none",counter=document.getElementById("pending-counter"),counter.textContent=parseInt(counter.textContent)-1}select_picture=document.getElementById("image"),pic_btn=document.getElementById("pic-btn"),preview_div=document.getElementById("img-preview"),preview_close=document.getElementById("preview-close"),pic_preview=document.getElementById("pic_preview"),null!=select_picture&&(select_picture.addEventListener("change",()=>{const e=select_picture.files[0];isFileImage(e)?(previewFile(e),pic_btn.style.display="none",preview_div.style.display="block"):select_picture.value=""}),preview_close.addEventListener("click",()=>{pic_btn.style.display="block",preview_div.style.display="none",select_picture.value=""})),null!=select_picture&&document.getElementById("edit-event").addEventListener("click",()=>{if(id=document.getElementById("id").value,title=document.getElementById("title").value,location_=document.getElementById("location").value,date=document.getElementById("date").value,details=document.getElementById("details").value,cost=document.getElementById("cost").value,""==title||""==location_||""==date||""==details||""==cost)return $("#error-msg").text("Fill up all fileds."),$(".error").show(),void hide_error();form=new FormData,form.append("title",title),form.append("location",location_),form.append("date",date),form.append("details",details),form.append("cost",cost),form.append("pay1",document.getElementById("pay1").value),form.append("pay2",document.getElementById("pay2").value),form.append("pay1_method",document.getElementById("pay1_method").value),form.append("pay2_method",document.getElementById("pay2_method").value),form.append("image",select_picture.files[0]),console.log(select_picture.files[0]),fetch("/event/edit_events/"+id,{method:"POST",body:form}).then(e=>e.json()).then(e=>{200==e.status&&(location.href="/event/"+e.id)})}),document.getElementById("copy-url").addEventListener("click",copy_url),document.querySelectorAll(".accept-btn").forEach(e=>{e.addEventListener("click",()=>{user_id=e.dataset.id,id=document.getElementById("id").value,form=new FormData,form.append("is_accepted","1"),form.append("user_id",user_id),fetch("/event/action/"+id,{method:"POST",body:form}).then(e=>e.json()).then(e=>{200==e.status&&(add_going(e.username,e.img,e.name,e.email),hide_pending(user_id))})})}),document.querySelectorAll(".cancel-btn").forEach(e=>{e.addEventListener("click",()=>{user_id=e.dataset.id,id=document.getElementById("id").value,form=new FormData,form.append("is_accepted","0"),form.append("user_id",user_id),fetch("/event/action/"+id,{method:"POST",body:form}).then(e=>e.json()).then(e=>{200==e.status&&hide_pending(user_id)})})}),join_send_btn=document.getElementById("join-send-btn"),null!=join_send_btn&&join_send_btn.addEventListener("click",()=>{if(id=document.getElementById("id").value,tr=document.getElementById("tr-id").value,method=document.getElementById("pay_method").value,""==tr)return $("#error-msg").text("Transaction ID is required"),$(".error").show(),void hide_error();form=new FormData,form.append("method",method),form.append("tr",tr),fetch("/event/pay/"+id,{method:"POST",body:form}).then(e=>e.json()).then(e=>{200==e.status&&(h3=document.createElement("h3"),span=document.createElement("span"),span.setAttribute("class","badge badge-info px-5 py-2"),span.textContent="Payment Pending",h3.appendChild(span),document.getElementById("payment-div").appendChild(h3),document.getElementById("join-modal-btn").style.display="none",counter=document.getElementById("pending-counter"),counter.textContent=parseInt(counter.textContent)+1,document.getElementById("close-modal").click())})});