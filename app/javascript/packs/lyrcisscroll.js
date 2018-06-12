if (document.getElementById("lyrics")) {
  var objDiv = document.getElementById("lyrics");
  console.log(objDiv.scrollTop)
  // objDiv.scrollTop = objDiv.scrollHeight;
  console.log(objDiv.scrollTop)

  document.getElementById('scroll').addEventListener('click',(event) => {
    let start = 0;
    const end = objDiv.scrollHeight;
    const scroll = setInterval(scrolling, 100);
    document.getElementById('intervalID').innerText = scroll;
    console.log(scroll)
  });

  function scrolling() {
    objDiv.scrollTop += 1;
    if (objDiv.scrollTop == objDiv.scrollHeight){
      clearInterval(id);
    }
  }

  document.getElementById('pause').addEventListener('click',(event) => {
    const intervalID = Number(document.getElementById('intervalID').innerText)
    clearInterval(intervalID);
  });

  document.getElementById('stop').addEventListener('click',(event) => {
    const intervalID = Number(document.getElementById('intervalID').innerText)
    clearInterval(intervalID);
    objDiv.scrollTop = 0;
  });

}
