function showLoader(show) {
    let loader = document.querySelector('#loader');
    if (show) {
      loader.classList.remove("hide");
    } else {
      loader.classList.add("hide");
    }
  }
  
  

    // fetch all genres/ categories from WP
function getGenres() {
  fetch('http://oskarwiegaard.dk/wp/wp-json/wp/v2/categories?parent=12')
    .then(function(response) {
      return response.json();
    })
    .then(function(categories) {
      console.log(categories);
      appendGenres(categories);
      showLoader(false);
    });
}

getGenres();

// append all genres
function appendGenres(genres) {
  let htmlTemplate = "";
  let footerTemplate = "";
  for (let genre of genres) {
    htmlTemplate += `
    <a href="#smykke-oversigt"><li  onclick="genreSelected('${genre.id}'); selected('${genre.name}', this);">- ${genre.name}</li></a>
    `;
    footerTemplate += `
    <a  href="#smykke-oversigt"><li onclick="genreSelected('${genre.id}'); footerSelected('${genre.name}');">${genre.name}</li></a>
    `;
  }

  document.querySelector('#smykke-menu-items').innerHTML = htmlTemplate;
  document.querySelector('#footer-smykke-items').innerHTML = footerTemplate;
}

function genreSelected(genreId){
  console.log(`Genre ID: ${genreId}`);
  if (genreId) {
    showLoader(true);
    fetch(`http://oskarwiegaard.dk/wp/wp-json/wp/v2/posts?_embed&categories=${genreId}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(smykker) {
        console.log(smykker);
        appendSmykkerByGenre(smykker);
        showLoader(false);
      });
  }
}

function footerSelected(genreName){
  let smykkeOverskrift = document.querySelector('.smykkeh1')
  smykkeOverskrift.innerHTML = genreName
}

function selected(genreName, element){
  let menuItems = document.querySelectorAll('#smykke-menu-items a li')
  let smykkeOverskrift = document.querySelector('.smykkeh1')
  console.log(genreName)
  smykkeOverskrift.innerHTML = genreName
  console.log(menuItems)
  console.log(element)

  for (let menuItem of menuItems) {
  if(menuItem.classList.contains("highlighted")){
    menuItem.classList.remove("highlighted")
  }
  else{
    element.classList.add('highlighted')}
}
}

function appendSmykkerByGenre(smykkerByGenre) {
  let htmlTemplate = "";
  let clearGrids = `
  <div class="clear1"></div>
  <div class="clear2"></div>
  <div class="clear3"></div>
  <div class="clear4"></div>
  <div class="clear4end"></div>
  `
  for (let smykke of smykkerByGenre) {
    htmlTemplate += `
    
    <img src="${smykke.acf.smallimg}" onclick="appendSmykkerBig('${smykke.acf.bigimg}', '${smykke.acf.info}', '${smykke.acf.pris}')">
    `;
  }

  document.querySelector('.overview-grid-container').innerHTML = clearGrids + htmlTemplate;
  
}

  
  let smykker = [];
  // Her opretter vi et tomt array med navnet "smykker".
  // Så initiere vi functionen "get smykkes" hvor vi fetcher alt data om vores recipies som Json data fra vores opskriftdatabase på wordpress.
  // json og javascript kan frit konverteres frem og tilbage.
  // Når fetch er færdiggjort afslutter vores spinner.
  function getSmykker() {
    fetch('http://oskarwiegaard.dk/wp/wp-json/wp/v2/posts?per_page=100')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(json);
        appendSmykker(json);
        smykker = json;
        setTimeout(function() {
          //fjerner spinner efter load.
          showLoader(false);
        }, 200);
      });
  }
  
  // getSmykker();
  
  
  
  // Da vores json er fetchet kan vi nu append det til DOM.
  // vi initiere herefter et for-loop hvor vi kører gennem den samme kodeblok igen og igen inditl alle smykkerne er gennemgået.
  // noget af dataen er gemt væk under "moreInfo" classen som bliver vist ved at trykke på objectet på siden.
  function appendSmykker(smykker) {
    let htmlTemplate = "";
  
    for (let smykke of smykker) {
      htmlTemplate += `
          <img src="${smykke.acf.smallimg}" onclick="appendSmykkerBig('${smykke.acf.bigimg}', '${smykke.acf.info}', '${smykke.acf.pris}')">
      `;
    }
  
  
  //Smykkerne bliver hermed appended til innerHTML i vores container ".overview-grid-container"
  
    document.querySelector('.overview-grid-container').innerHTML += htmlTemplate;
  
  
  }


  function appendSmykkerBig(bigimg, info, pris) {
    console.log(bigimg, info, pris);
    let htmlTemplate = "";
  
      htmlTemplate += `
          <div id="big-img-preview">
          <img src="${bigimg}">
          <p>${info}</p>
          <h4>${pris} kr.</h4>
          </div>
      `;
  
  
  //Smykkerne bliver hermed appended til innerHTML i vores container ".left-grid"
  
    document.querySelector('.left-grid').innerHTML = htmlTemplate;
  
  
  }
  