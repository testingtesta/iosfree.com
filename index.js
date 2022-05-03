





function myFunction() {

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
alert("MOBILE");
}else{
  // false for not mobile device
 alert("nooo");
}
}