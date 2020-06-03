// Showloader function til at show/hide loading icon.
// showLoader(true) = så bliver den vist
// showLoader(false) = loader bliver skjult

function showLoader(show) {
    let loader = document.querySelector('#loader');
    if (show) {
      loader.classList.remove("hide");
    } else {
      loader.classList.add("hide");
    }
  }
  
  

 // Her fetcher vi alle genrene fra vores WordPress Headless CMS
 // Vi henter alle kategorierne inden for parent-kategorien: smykker(id=12)
 // Respone = Array(6): Armbånd, Broche, Halskæde, Ring, Øreclips, Øreringe
 // Herefter kalder vi functionen appendGenres(categories), med arrayet som parameter.
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

// Kalder functionen getGenres()
getGenres();

// Ved hjælp af for-of loop kan vi append alle kategorierne (categories) og få tilføjet menupunkterne til smykkemenuen
// Vi bruger backtick string får at append hver iteration til smykkemenuen og footeren i vores HTML
// Hver menupunkt er et a-tag til #smykke-oversigt samt 2 onclick functioner: genreSelected('${genre.id}') og selected('${genre.name}/footerSelected('${genre.name}')
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

// Når brugeren klikker på en smykke-kategori bliver funktionen genreSelected(genreId) kaldt, 
// med genre.id'et som parameter for den valgt kategori
// Herefter fetcher vi alle posts inden for den valgte kategori ved hjælp af &categories=${genreId}
// Til sidst bliver appendSmykkerByGenre(smykker) kaldt.
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

// Udover at genreSelected som onclick, har vi også disse to functioner: footerSelected(genreName) og selected(genreName, element)
// footerSelected bruges til at append overskrift navnet til den valgt menu på smykke-oversigt siden.
function footerSelected(genreName){
  let smykkeOverskrift = document.querySelector('.smykkeh1')
  smykkeOverskrift.innerHTML = genreName
}
// Ved functionen selected bliver overskriften til kategorien også appendet,
// men derudover bliver der også tilføjet classen 'highlighted' som giver det valgte menupunkt en gul streg og tykkere skrift
// for-of loopet er til for at fjerne classen highlight fra andre menupunkter når en ny kategori bliver valgt

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

// funktionen her bliver kaldt fra genreSelected(genreId) og bruges til at tilføje de posts der er i den valgte kategori
// Det er igen med et for-of loop som tager alle posts fra den valgte kategori
// Herudover har vi også 'clearGrids' som er en masse tomme div-elementer som skal bruges i griddet for at gøre nogle plads tommer, i forhold til vores design
// Hver post består af et lille billede, med en onclick som kører appendSmykkerBig(), med alle de parametre vi skal bruge
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
    appendSmykkerBig(`${smykke.acf.bigimg}`, `${smykke.acf.info}`, `${smykke.acf.pris}`)
  }
 
  document.querySelector('.overview-grid-container').innerHTML = clearGrids + htmlTemplate;
  
}

// Bliver kaldt når brugeren klikker på det lille billede, og for herved vidst et større preview billede samt info-teskt og pris
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
  