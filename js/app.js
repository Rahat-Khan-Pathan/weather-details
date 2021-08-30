function getInputValue(id) {
    const val = document.getElementById(id).value;
    document.getElementById(id).value = '';
    return val;
}
function showValue(id,val) {
    document.getElementById(id).innerText = val;
}
function setVisible(id) {
    document.getElementById(id).style.display = 'block';
}
function setInvisible(id) {
    document.getElementById(id).style.display = 'none';
}
function fetchData(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayData(data))
      .catch(error => {
        const elements = document.getElementsByClassName('hidden');
        for(ele of elements) {
            ele.style.display = 'none';
        }
        showError('Network Error!');
      });
}
function displayData(data) {
    // console.log(data);
    if(data.cod == '404') {
        showError('City Not Found!');
        return;
    }
    setVisible('hidden');
    const type = data.weather[0].main;
    const id = data.weather[0].id;
    showValue('name-city',data.name);
    showValue('name-temp',(parseFloat(data.main.temp)-273.15).toFixed(2) + '\xB0C')
    showValue('name-type',type);
    setImage(data.weather[0].icon);
}
function setImage(icon) {
    document.getElementById('icon').setAttribute('src',`http://openweathermap.org/img/wn/${icon}@2x.png`)
}
function showError(errorMessage) {
    showValue('error',errorMessage);
    setVisible('error');
}
document.getElementById('button-search').addEventListener('click',function() {
    const inputCity = getInputValue('input-city').toLowerCase();
    setInvisible('hidden');
    setInvisible('error');
    if(inputCity == '') {
        showError('Please Enter a City!');
        return;
    }
    const API = '4b5f5c378962441c1c0063e2bb400c5c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API}`;
    setVisible('spinner');
    setTimeout(() => {
        setInvisible('spinner');
    }, (200));
    fetchData(url);
})
fetchData(`https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=4b5f5c378962441c1c0063e2bb400c5c`);