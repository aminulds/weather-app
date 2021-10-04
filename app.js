window.addEventListener('load', () => {
    let lon;
    let lat;

    //selector
    const weatherIcon = document.querySelector('.weatherIcon');
    const locationTimezone = document.querySelector('.location-timezone');
    const tempValue = document.getElementById('tempValue');
    const temSummery = document.querySelector('.temperature-description');
    const unit = document.getElementById('unit');
    const degreeSection = document.querySelector('.degree-section');
    //Check geo location browser permission
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5df779038a66e5f42ca9704d0d6bdbbe`;
            //Fetch api data
            fetch(api)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                //collect data
                const {temp} = data.main;
                const {description, icon} = data.weather[0];
                const {country} = data.sys;
                // temperature convert
                const celsius = (temp - 273.15).toFixed(2);
                const fahrenheit = (celsius * (9 / 5) + 32).toFixed(2);
                // change Weather unit
                degreeSection.addEventListener('click', () => {
                    // check weather unit
                    if (unit.textContent === 'C'){
                        unit.textContent = 'F';
                        tempValue.textContent = fahrenheit;
                    }
                    else{
                        unit.textContent = 'C';
                        tempValue.textContent = celsius;
                    }
                })
                
                //show data on html page
                locationTimezone.textContent = country;
                weatherIcon.innerHTML = `<img src="icons/${icon}.png" alt="Weather Icon">`;
                tempValue.textContent = celsius;
                temSummery.textContent = description;
                
            })
        })
    }

});