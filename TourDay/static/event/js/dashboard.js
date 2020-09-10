Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
document.getElementById("date").value = new Date().toDateInputValue();

function card(date, title, text, id) {
  div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12 col-md-12 col-lg-12");

  div2 = document.createElement("div");
  div2.setAttribute("class", "items-card");

  a1 = document.createElement("a");
  a1.setAttribute("class", "card-a");
  a1.setAttribute("href", `/event/${id}`);

  div3 = document.createElement("div");
  div3.setAttribute("class", "card bg-white mb-3");

  div4 = document.createElement("div");
  div4.setAttribute("class", "card-header");
  div4.textContent = date;
  div5 = document.createElement("div");
  div5.setAttribute("class", "card-body");

  h5 = document.createElement("h5");
  h5.setAttribute("class", "card-title");
  h5.textContent = title;

  p = document.createElement("p");
  p.setAttribute("class", "card-text");
  p.textContent = text;

  div5.appendChild(h5);
  div5.appendChild(p);

  div3.appendChild(div4);
  div3.appendChild(div5);
  a1.appendChild(div3);
  div2.appendChild(a1);
  div1.appendChild(div2);
  document.getElementById("root-div").appendChild(div1);
}

document.getElementById("create-event").addEventListener("click", () => {
  title = document.getElementById("title").value;
  location_ = document.getElementById("location").value;
  date = document.getElementById("date").value;
  details = document.getElementById("details").value;
  if (title == "" || location_ == "" || date == "" || details == "") {
    $("#error-msg").text("Fill up all fileds.");
    $(".error").show();
    hide_error();
    return;
  }
  form = new FormData();
  form.append("title", title);
  form.append("location", location_);
  form.append("date", date);
  form.append("details", details);
  form.append("pay1", document.getElementById("pay1").value);
  form.append("pay2", document.getElementById("pay2").value);
  form.append("pay1_method", document.getElementById("pay1_method").value);
  form.append("pay2_method", document.getElementById("pay2_method").value);

  fetch("/event/dashboard/", {
    method: "POST",
    body: form,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 200) {
        location.href = "/event/1";
      }
    });
});

function get_events() {
  fetch("/event/get_events", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((e) => {
        card(e.date, e.title, e.details, e.id);
      });
    });
}
get_events();