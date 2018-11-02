const axios = require('axios')

class Controller {

    static listManga(req, res) {
        axios({
            method: 'GET',
            url: `https://www.mangaeden.com/api/list/0/?p=${req.params.page_id}&l=60`
        })
        .then(response => {
            let mangas = response.data

            res.status(200).json({
                message: 'Successfully retrieve manga list',
                data: mangas
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'Failed to retrieve manga list',
                error: err
            })
        })
    }

    static searchManga(req, res) {
        axios({
            method: 'GET',
            url: `https://www.mangaeden.com/api/list/0`
        })
        .then(response => {
            let mangas = response.data.manga
            let searchedManga = []

            let input = req.params.input.split(',').join(' ')
            for (let i = 0; i < mangas.length; i++) {
                if(mangas[i].t.toLowerCase().indexOf(input) !== -1) {
                    searchedManga.push(mangas[i])
                }
            }

            res.status(200).json({
                message: 'Successfully search manga list',
                data: searchedManga
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'Failed to search manga list',
                error: err
            })
        })
    }

    static mangaDetail(req, res) {
        axios({
            method: 'GET',
            url: `https://www.mangaeden.com/api/manga/${req.params.manga_id}`
        })
        .then(response => {
            let manga = response.data

            res.status(200).json({
                message: 'Successfully retrieve manga info',
                data: manga
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'Failed to retrieve manga info',
                error: err
            })
        })
    }

    static mangaChapter(req, res) {
        axios({
            method: 'GET',
            url: `https://www.mangaeden.com/api/chapter/${req.params.chapter_id}`
        })
        .then(response => {
            let chapter = response.data

            res.status(200).json({
                message: 'Successfully retrieve chapter info',
                data: chapter
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'Failed to retrieve chapter info',
                error: err
            })
        })
    }
}


module.exports = Controller
