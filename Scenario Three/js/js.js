//  an array with all the input filed for hours
var hoursDayInput = document.getElementsByClassName('hoursDay');
//  an array with all the days
var day1 = document.getElementsByClassName('day1');
var day2 = document.getElementsByClassName('day2');
var day3 = document.getElementsByClassName('day3');
var days = [];
days.push(day1, day2, day3);

var total = document.getElementsByClassName('total');
// add event listener to all input fields and set their value to 0
var i = j = 0;
for (i = 0; i < hoursDayInput.length; i++) {
  hoursDayInput[i].value = 0;
  hoursDayInput[i].addEventListener("change", inputChanged);
}
for (i = 0; i < days.length; i++) {
  for (j = 0; j < days[i].length; j++) {
    days[i][j].value = 0;
    days[i][j].addEventListener("change", inputChanged);
  }
}

//when a field is changed, do this:
//set default value to nr of classes and presence to 0
function inputChanged(e) {
  var totalnoclasses = 0;
  var presence = [];
  for (i = 0; i < total.length; i++) {
    presence[i] = 0;
  }
  //calculate the total number of classes (horizontally)
  for (i = 0; i < hoursDayInput.length; i++)
    totalnoclasses += parseInt(hoursDayInput[i].value);
  //calculate the total number of classes attended for each student(row)
  for (i = 0; i < days.length; i++) {
    for (j = 0; j < total.length; j++) {
      presence[j] += parseInt(days[i][j].value);
    }
  }
  //spit the attendance with only 1 decimal  ( .toFixed(1) )
  for (i = 0; i < total.length; i++) {
    total[i].innerHTML = ((presence[i] / totalnoclasses * 100).toFixed(1)) + "%";
  }
}

//add student
function addStudent() {
  var newStudentName = document.getElementById('newStudentInput').value;

  //check if name exists
  var allStudentNames = document.getElementsByClassName('studentName');
  var exists = false;

  for (var i = 0; i < allStudentNames.length; i++) {
    if (allStudentNames[i].innerHTML === newStudentName) {
      exists = true;
    }
  }

  if ((exists === false) && (newStudentName !== "")) {
    // Get a reference to the table
    let tableRef = document.getElementById('attendance');
    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);
    newRow.setAttribute("class", "student");

    // Insert cells with the necessary attributes & children & EventListeners
    var nrOFcells = tableRef.rows[0].cells.length;
    for (var i = 0; i < nrOFcells; i++) {
      var newCell = newRow.insertCell();

      if (i === 0) {
        var name = document.createTextNode(newStudentName);
        newCell.appendChild(name);
        newCell.setAttribute("class", "studentName");
      }

      if ((i > 0) && (i < (nrOFcells - 1))) {
        var newInput = document.createElement("input");
        newInput.setAttribute("type", "number");
        newInput.setAttribute("min", 0);
        newInput.setAttribute("value", 0);
        newInput.setAttribute("class", "day" + i);
        newCell.appendChild(newInput);
        newCell.addEventListener("change", inputChanged);
      }

      if (i === (nrOFcells - 1)) {
        newCell.setAttribute("class", "total");
        newCell.innerHTML = "0%";
      }
    }
  }
  if (newStudentName === "") {
    alert("Please input a name!");
  }
  if (exists === true) {
    alert(newStudentName + " is already registered!");
  }
}

// "const sleep" & "async": for timer to work
const sleep = ms => new Promise(res => setTimeout(res, ms));

async function deleteStudent() {
  var deleteThisName = document.getElementById('deleteStudentInput').value;
  //check if name exists
  var allStudentNames = document.getElementsByClassName('studentName');
  var tableRef = document.getElementById('attendance');
  var deleted = false;

  for (var i = 0; i < allStudentNames.length; i++) {
    if (allStudentNames[i].innerHTML === deleteThisName) {
      tableRef.rows[i + 1].style.backgroundImage = "url('imgs/fire.gif')"; //this raw is on fiiiiiire
      await sleep(700);
      tableRef.deleteRow(i + 1);
      deleted = true;
    }
  }

  if (deleted === false) {
    alert("Name does not exists!");
  }

}

function addDay() {
  var allRows = document.getElementsByClassName('student');

  for (var i = 0; i < allRows.length; i++) {
    var newCell = allRows[i].insertCell(days.length + 1); //add at correct possition, second to last every time

    if (i === 0) {
      var textDay = document.createTextNode("classes Day " + (days.length + 1));
      newCell.appendChild(textDay);
      newCell.setAttribute("id", "header");

      var newInput = document.createElement("input");
      newInput.setAttribute("type", "number");
      newInput.setAttribute("min", 0);
      newInput.setAttribute("value", 0);
      newInput.setAttribute("class", "hoursDay");
      newCell.appendChild(newInput);
      newCell.addEventListener("change", inputChanged);
      hoursDayInput = document.getElementsByClassName('hoursDay'); //update

    } else {
      var newInput = document.createElement("input");
      newInput.setAttribute("type", "number");
      newInput.setAttribute("min", 0);
      newInput.setAttribute("value", 0);
      var nextDayClass = "day" + (days.length + 1);
      newInput.setAttribute("class", nextDayClass);
      newCell.addEventListener("change", inputChanged);
      newCell.appendChild(newInput);
    }
  }
  //update
  var dayX = document.getElementsByClassName(nextDayClass);
  days.push(dayX);
}

//give a random color for the table shadow
function putShadow() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var shadow = "0 0 10px 2px rgb(" + r + "," + g + "," + b + ")";
  document.getElementById("pimpID").innerHTML = "AGAIN!";
  document.getElementById("attendance").style.boxShadow = shadow;
}
