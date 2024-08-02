
function addSeriesEdit(){
    let number = document.querySelectorAll('.series').length + 1
    
    let newSeries = document.createElement('fieldset')
    newSeries.className = 'series'
    
    let seriesText = document.createElement('p')
    seriesText.textContent = `${number} серия`
    
    let seriesInput = document.createElement('input')
    seriesInput.type = 'text'
    seriesInput.name = 'series'
    seriesInput.placeholder = 'Введите ссылку на серию'
    
    newSeries.appendChild(seriesText)
    newSeries.appendChild(seriesInput)
    
    urls.appendChild(newSeries)
}
