
// declare a function taking two arguments
// a JavaScript object such as Modernizr and an id of a table element
var inspectFeatures = function(objectName, tableid) {
  // get a reference to the element from the string argument
  var featuretable = document.getElementById(tableid);
  // set an incrementer to ensure a unique id for each inner table
  var tableCounter = 0;
  // loop through the properties in the object
  for (var feature in objectName) {
    // only display the true or false valued properties of Modernizr
    if (typeof objectName[feature] == 'boolean') {
      // create table cell
      var row = document.createElement('tr');
      var cell = document.createElement('td');
      //put the value of the property in the cell contents
      cell.innerHTML = feature;
      // append the cell to the row
      row.appendChild(cell);
      // choose text color green if the property value is true, or red if not
      var color = objectName[feature] == true ? 'green' : 'red';
      // set the style color of the cell
      cell.style.color = color;
      cell.style.border = "solid 1px black";
      // append the row to the table
      featuretable.appendChild(row);
      // some properties are not boolean values but are objects in themselves
    }
  };
}
// invoke function on Modernizr object, output to existing table on page markup
inspectFeatures(Modernizr, 'featuretable');