if (document.getElementById("lyrics")) {
  var objDiv = document.getElementById("lyrics");
  console.log(objDiv.scrollTop)
  // objDiv.scrollTop = objDiv.scrollHeight;
  console.log(objDiv.scrollTop)

  document.getElementById('scroll').addEventListener('click',(event) => {
    if (document.getElementById('scroll').classList.contains('disabled')){

    }else{
    document.getElementById('scroll').classList.add('disabled')
    let start = 0;
    const end = objDiv.scrollHeight;
    const scroll = setInterval(scrolling, 100);
    document.getElementById('intervalID').innerText = scroll;
    console.log(scroll)
    }
  });

  function scrolling() {
    objDiv.scrollTop += 1;
    if (objDiv.scrollTop == objDiv.scrollHeight){
      const intervalID = Number(document.getElementById('intervalID').innerText);
      clearInterval(intervalID);
    }
  }

  document.getElementById('pause').addEventListener('click',(event) => {
    const intervalID = Number(document.getElementById('intervalID').innerText);
    clearInterval(intervalID);
    document.getElementById('scroll').classList.remove('disabled');
  });

  document.getElementById('stop').addEventListener('click',(event) => {
    const intervalID = Number(document.getElementById('intervalID').innerText);
    clearInterval(intervalID);
    objDiv.scrollTop = 0;
    document.getElementById('intervalID').innerText = '0';
    document.getElementById('scroll').classList.remove('disabled');
  });

}
