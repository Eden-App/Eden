const axios = require('axios'),
      parseString = require('xml2js').parseString,
      queryString = require('query-string');

class NewsController {

  // ! SHOWING ARTICLES
  static article(req, res) {
    console.log(`masuk article`)
    let inp = queryString.stringify(req.body)
    let url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?' + inp + `&api-key=${process.env.N_KEY}`

    axios({
      method: 'get',
      url: url
    })
      .then(resp => {
        res.json(resp.data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  // ! SHOWING BESTSELLERS
  static bestSeller(req, res) {
    let inp = queryString.stringify(req.body).substr(2)
    let url = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/' + inp + `.json?api-key=${process.env.N_KEY}`

    axios({
      method: 'get',
      url: url
    })
      .then(resp => {
        res.json(resp.data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  // ! TOP STORIES
  static topStories(req, res) {
    let inp = queryString.stringify(req.body).substr(2)
    // let url2 = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=bde19f6b5026411ab2fc4dd097eaa87f'
    let url = 'https://api.nytimes.com/svc/topstories/v2/' + inp + `.json?api-key=${process.env.N_KEY}`

    // res.json(url)
    axios({
      method: 'get',
      url: url
    })
      .then(resp => {
        res.json(resp.data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static mostViewed(req, res) {
    let inp = queryString.stringify(req.body).substr(2)
    let url2 = 'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/Arts/1.json?api-key=bde19f6b5026411ab2fc4dd097eaa87f';
    let url = 'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/' + inp + `/1.json?api-key=${process.env.N_KEY}`

    axios({
      method: 'get',
      url: url
    })
      .then(resp => {
        res.json(resp.data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = NewsController