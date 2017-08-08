function SaveItem() {
  var name = document.forms.ShoppingList.name.value;
  var data = document.forms.ShoppingList.data.value;
  localStorage.setItem(name, data);
  doShowAll();
}

function ModifyItem() {
  var name = document.forms.ShoppingList.name.value;
  document.forms.ShoppingList.data.value = localStorage.getItem(name);
  doShowAll();
}

function RemoveItem() {
  var name = document.forms.ShoppingList.name.value;
  document.forms.ShoppingList.data.value = localStorage.removeItem(name);
  doShowAll();
}

function ClearAll() {
  localStorage.clear();
  doShowAll();
}

// dynamically draw the table

function doShowAll() {
  var key = "";
  var list = "<tr><th>Name</th><th>Value</th></tr>\n";
  var i = 0;
  for (i = 0; i <= localStorage.length - 1; i++) {
    key = localStorage.key(i);
    list +=
      "<tr><td>" +
      key +
      "</td>\n<td>" +
      localStorage.getItem(key) +
      "</td></tr>\n";
  }
  if (list == "<tr><th>Name</th><th>Value</th></tr>\n") {
    list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
  }
  document.getElementById("list").innerHTML = list;
}
