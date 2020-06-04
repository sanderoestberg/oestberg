//======== SPA SERVICE ========== //

export default class SpaService {
  constructor(defaultPage) {
    this.defaultPage = defaultPage;
    this.pages = document.querySelectorAll(".page");
    this.navItems = document.querySelectorAll(".navbar a");
    this.pageChange();
  }

  // hides all pages
  hideAllPages() {
    for (let page of this.pages) {
      page.style.display = "none";
    }
  }

  // show page or tab
  // Derudover er der et if og else statement, 
  // som gør at smykkemenuen kun bliver vist på siderne: "#smykker" og "#smykke-oversigt"
  // Ved side skift, scroll til toppen af siden
  showPage(pageId) {
    this.hideAllPages();
    document.querySelector(`#${pageId}`).style.display = "block";
    this.setActiveTab(pageId);
    window.scrollTo(0, 0)

    if (pageId.includes("smyk")) {
      document.querySelector('.smykkemenu').style.display = "flex";
    } else {
      document.querySelector('.smykkemenu').style.display = "none";
    }
  }

  // adds a class styling to menu item
  setActiveTab(pageId) {
    for (let navItem of this.navItems) {
      if (`#${pageId}` === navItem.getAttribute("href")) {
        navItem.classList.add("highlighted");
      } else {
        navItem.classList.remove("highlighted");
      }
    }
  }

  // navigate to a new view/page by changing href
  navigateTo(pageId) {
    window.location.href = `#${pageId}`;
  }

  // set default page or given page by the hash url
  // function is called 'onhashchange'
  pageChange() {
    let page = this.defaultPage;
    if (window.location.hash) {
      page = window.location.hash.slice(1);
    }
    this.showPage(page);
  }
}