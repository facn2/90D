function addDays (date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
// get todays date
var today = new Date();
// adds 90 days to today
var date90 = addDays(today, 90);
// split into dd/mm/yyyy format
var dd = date90.getDate();
var mm = date90.getMonth() + 1; // January is 0!
var yyyy = date90.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}
var endDate = dd + '/' + mm + '/' + yyyy;
var dateContainer = document.getElementById('dateContainer');
var dateInput = document.getElementById('dateInput');
var date = document.createElement('h3');
dateInput.value = date90;
date.innerText = endDate;
dateContainer.appendChild(date);
