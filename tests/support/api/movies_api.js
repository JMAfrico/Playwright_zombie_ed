import { title } from 'process';

const { expect } = require('@playwright/test')
require('dotenv').config();

export class MoviesApi {

    constructor(request) {
        this.baseAPI = process.env.BASE_API;
        this.request = request;
        this.token = undefined;
    }

    //Token
    async createToken() {

        const response = await this.request.post(this.baseAPI +'/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text());
        this.token = 'Baerer '+body.token;
        
    }

    //Get Movie
    async getMovie(movieTitle){
        await this.createToken();
        const response = await this.request.get(this.baseAPI +'/movies',{
            headers:{
                Authorization: this.token
            },
            params:{
                title:movieTitle
            }
        });

        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text());
        expect(body.data[0].title).toEqual(movieTitle);
        console.log(body);
    }

    //Get Company Id por Nome
    async getCompanyIdByName(companyName){
        await this.createToken();

        const response = await this.request.get(this.baseAPI +'/companies',{
            headers:{
                Authorization: this.token,
            },
            params:{
                name:companyName
            }
        })

        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text())
        return body.data[0].id;
    }

    //Create Movie
    async createMovie(movie) {
        await this.createToken();
        let companyId = await this.getCompanyIdByName(movie.company)

        const response = await this.request.post(this.baseAPI +'/movies', {
            headers: {
                Authorization: this.token,
                ContentType:'multipart/form-data',
                Accept:'application.json, text/plain,*/*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.featured
                
            }
        })
        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text())
        console.log(body);
    }

    //Get Movie Id por Title
    async getMovieIdByTitle(movieTitle){
        await this.createToken();

        const response = await this.request.get(this.baseAPI +'/movies',{
            headers:{
                Authorization: this.token
            },
            params:{
                title:movieTitle
            }
            
        })
        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text())
        return body.data[0].id;
    }

    //Delete movie
    async deleteMovie(movie){
        let movieId = await this.getMovieIdByTitle(movie.title);

        const response = await this.request.delete(this.baseAPI +'/movies/'+movieId,{
            headers:{
                Authorization: this.token
            }
        })
        expect(response.ok()).toBeTruthy();
    }
}