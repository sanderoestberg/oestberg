//======== FÆLLES OPSÆTNING ========== //

export default class SpaService {
  constructor(defaultPage) {
    this.defaultPage = defaultPage;
    this.pages = document.querySelectorAll(".page");
    this.navItems = document.querySelectorAll(".navbar a");
    this.pageChange();
  }

  // hide all pages
  hideAllPages() {
    for (let page of this.pages) {
      page.style.display = "none";
    }
  }

  // show page or tab
  showPage(pageId) {
    this.hideAllPages();
    document.querySelector(`#${pageId}`).style.display = "block";
    this.setActiveTab(pageId);
  }

  // adds a class to menu item
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