window.addEventListener('load', () => {
    let lon;
    let lat;

    //selector
    const weatherIcon = document.querySelector('.weatherIcon');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperature = document.getElementById('temperature');
    const temSummery = document.querySelector('.temperature-description');
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
                // temperature convert into Celsius
                const celsius = (temp - 273.15).toFixed(2);
                //show data on html page
                locationTimezone.textContent = country;
                weatherIcon.innerHTML = `<img src="icons/${icon}.png" alt="Weather Icon">`;
                temperature.textContent = celsius;
                temSummery.textContent = description;
                
            })
        })
    }
});