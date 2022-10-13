import DomElements           from "../other/DomElements.js";
import SetCoordinateToButton from '../other/SetCoordinateToButton.js';
import SendCoordinate        from '../other/SendCoordinateToForecast.js';

class DisplayCityGeoCoordinate {

    displayGeoCoordinate(arrayGeoCoordinate, countryFlag) {
        console.log(arrayGeoCoordinate);
        const domElements      = new DomElements();
        const errorMessage     = domElements.getSpanForErrorMessage();
        const target           = domElements.getSectionForCitySelection();
        errorMessage.innerText = "";
        target.innerHTML       = "";

        const existingUl = target.querySelectorAll("ul");
            if (existingUl.length > 0) {
                existingUl.forEach((ul) => ul.remove());
            }
        
        const list     = document.createElement('ul');
        list.className = "city-selection__inner";
        target.append(list);

        for( let i = 0; i < arrayGeoCoordinate.length; i++ ) {
            const geoCoordinate  = arrayGeoCoordinate[i];
            const listItemsEvent = new SetCoordinateToButton();
            const listItems      = document.createElement("li");
            const listFlag       = document.createElement('li');
            const flag           = document.createElement('img');
            listItems.innerHTML  = `
                                ${geoCoordinate.getFormattedAddress()}
                            `;
            listItemsEvent.className = "city-selection__items";
            
            listFlag.className = "city-selection__items";
            
            flag.src = `
                        ${countryFlag[i]}
            `;
            flag.alt = `
                        Drapeau du pays
            `;
            flag.className = "city-selection__img";

            listItems.dataset.latitude  = geoCoordinate.getLatitude();
            listItems.dataset.longitude = geoCoordinate.getLongitude();
            listItems.dataset.city      = geoCoordinate.getLocation();
            listItems.dataset.cntycode  = geoCoordinate.getCountryCode();
            listItems.className         = "city-selection__items";
            listItems.addEventListener("click", listItemsEvent.setCityCoordinateToButton);
            
            list.append(listItems);
            listFlag.append(flag);
            list.append(listFlag);
        }
        const button      = document.createElement("button");
        const buttonEvent = new SendCoordinate();
        button.disabled   = true;
        button.innerText  = "Valider";
        button.className += "button city-selection__button";
        button.addEventListener("click", buttonEvent.sendCoordinateToForecast);
        target.append(button);
    }
    displayError(error) {
        const domElements          = new DomElements();
        const section              = domElements.getSectionForCitySelection()
        const spanErrorMessage     = domElements.getSpanForErrorMessage();
        section.innerHTML          = "";
        spanErrorMessage.innerText = error;
    }
}

export default DisplayCityGeoCoordinate;