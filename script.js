const btn = document.querySelector(".btn");
const wrap = document.querySelector(".wrap");
const Url = "https://api.thecatapi.com/v1/images/search?limit=10";


async function Pictures() {
  try {
    const response = await fetch(Url);
    const data = await response.json();
    return use(data)  
  } catch (error) {   
      console.log(error.message);
  }
}

function use(data) {
  btn.addEventListener("click", () => { 
    showLoader() 
    let i = 0;
    const chunkSize = 10;
    function insertImagesChunk() {
      let end = Math.min(i + chunkSize, data.length);  
      do {
        let elem = `<img src=${data[i].url}></img>`;
        wrap.innerHTML += elem;
        i++;
      } while (i < end);
      if (i < data.length) {
        setTimeout(insertImagesChunk, 0); 
      }   
    }
  insertImagesChunk();
  setTimeout(()=>{
    document.getElementById("loader").style.display = "none";
    document.querySelector(".btn_flex").style.display = "none";
  },5000);
  })  
}

function showLoader() {
  document.getElementById("loader").style.display = "flex";
}


Pictures()  

