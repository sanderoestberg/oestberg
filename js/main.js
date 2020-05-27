import SpaService from "./spa-service.js";


let _spaService = new SpaService("forside");

window.pageChange = function () {
    _spaService.pageChange();
}