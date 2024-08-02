// let addFilmUrlBtn = document.querySelector('#addFilmUrlBtn')
// let addSeriesBtn = document.querySelector('#addSeriesBtn')
let urls = document.querySelector('#urls')

function addSeries(){
    console.log('work');
    // addFilmUrlBtn.style.display = 'none';
    let number = document.querySelectorAll('.series').length + 1;
    
    let newSeries = document.createElement('fieldset');
    newSeries.className = 'series';
    
    let seriesText = document.createElement('p');
    seriesText.textContent = `${number} серия`;
    
    let seriesInput = document.createElement('input');
    seriesInput.type = 'text';
    seriesInput.name = 'series';
    seriesInput.placeholder = 'Введите ссылку на серию';
    
    newSeries.appendChild(seriesText);
    newSeries.appendChild(seriesInput);
    
    urls.appendChild(newSeries);
}

function addFilmUrl(){
    addSeriesBtn.style.display = 'none'
    urls.innerHTML = 
    `
    <fieldset class="fieldset" id="filmUrl">
        <label for="">Ссылка на фильм</label>
        <input type="text" placeholder="Введите ссылку на фильм" name="video">
    </fieldset>
    `
}