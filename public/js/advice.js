var FAQ1 = document.getElementById('FAQ1');
var FAQ1content = document.getElementById('FAQ1content');
var FAQ2 = document.getElementById('FAQ2');
var FAQ2content = document.getElementById('FAQ2content');
var FAQ3 = document.getElementById('FAQ3');
var FAQ3content = document.getElementById('FAQ3content');
var FAQ4 = document.getElementById('FAQ4');
var FAQ4content = document.getElementById('FAQ4content');
var FAQ5 = document.getElementById('FAQ5');
var FAQ5content = document.getElementById('FAQ5content');
var TIP1 = document.getElementById('TIP1');
var TIP1content = document.getElementById('TIP1content');
var TIP2 = document.getElementById('TIP2');
var TIP2content = document.getElementById('TIP2content');
var TIP3 = document.getElementById('TIP3');
var TIP3content = document.getElementById('TIP3content');

// var addEventListenerAndToggleClip = function (element1, element2) {
//   element1.addEventListener('click', function (event) {
//     element2.classList.toggle('clip');
//   });
// };
// addEventListenerAndToggleClip('FAQ1', 'FAQ1content');

FAQ1.addEventListener('click', function (event) {
  FAQ1content.classList.toggle('clip');
});
FAQ2.addEventListener('click', function (event) {
  FAQ2content.classList.toggle('clip');
});
FAQ3.addEventListener('click', function (event) {
  FAQ3content.classList.toggle('clip');
});
FAQ4.addEventListener('click', function (event) {
  FAQ4content.classList.toggle('clip');
});
FAQ5.addEventListener('click', function (event) {
  FAQ5content.classList.toggle('clip');
});
TIP1.addEventListener('click', function (event) {
  TIP1content.classList.toggle('clip');
});
TIP2.addEventListener('click', function (event) {
  TIP2content.classList.toggle('clip');
});
TIP3.addEventListener('click', function (event) {
  TIP3content.classList.toggle('clip');
});
