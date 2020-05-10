const baseURL = 'http://localhost:3000/api/countriesPlus/'

export default {
  getCountries(){
    return fetch(baseURL)
    .then(res => res.json())
  },

  createCountry(payload){
    return fetch(baseURL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  },
  updateCountry(id, payload){
    return fetch(baseURL + id, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())

  }
}
