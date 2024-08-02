function saveToWatch(id){
    axios.post('/api/film/save', {id}).then(data => {
        alert(data.data)
        location.reload()
    })
}

function deleteFromToWatch(id){
    axios.delete(`/api/film/save/${id}`).then(data =>{
        alert(data.data)
        location.reload()
    })
}