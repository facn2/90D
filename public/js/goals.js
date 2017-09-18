function dateDiffInDays (a, b) {
  // Discard the time and time-zone information.
  var millisecondsPerDay = 1000 * 60 * 60 * 24;
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  console.log('This is utc1: ', utc1);
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / millisecondsPerDay);
}

// get todays date
var today = new Date();
console.log('This is the date now: ', typeof today);
// get end date
var goalList = document.getElementById('goalList');
var goals = goalList.children;
Object.keys(goals).forEach((key) => {
  var goal = goals[key];
  var endDate = new Date(goal.children[2].innerText);
  var dayDiff = dateDiffInDays(today, endDate);
  var endDateItem = document.createElement('li');
  endDateItem.innerText = 'Days left: ' + dayDiff;
  goalList.appendChild(endDateItem);
});
