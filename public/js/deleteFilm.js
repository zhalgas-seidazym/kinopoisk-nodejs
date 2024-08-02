function deleteFilm(id, authorID){
    const data = axios.delete(`/api/film/${id}`)
        .then(res => {
            if(res.status == 200){
                location.replace(`/admin/${authorID}`)
            }
            else if(res.status == 400){
                location.replace('not-found')
            }
        })
}