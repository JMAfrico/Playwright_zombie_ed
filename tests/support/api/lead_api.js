const { expect } = require('@playwright/test')
require('dotenv').config();

export class LeadApi {

    constructor(request) {
        this.baseAPI = process.env.BASE_API;
        this.request = request;
        this.token = undefined;
    }

    async createToken() {
        const response = await this.request.post(this.baseAPI + '/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text());
        this.token = 'Baerer ' + body.token;

    }

    
    async getLead(email){
        await this.createToken();
        const response = await this.request.get(this.baseAPI + '/leads',{
            headers:{
                Authorization: this.token
            },
            params:{
                email: email
            }
        })

        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.data[0].email).toEqual(email);
        console.log(body)
    }

    async createLead(name, email) {
        const response = await this.request.post(this.baseAPI + '/leads', {
            data: {
                name: name,
                email: email
            }
        })
        await expect(response.ok()).toBeTruthy();
    };

    async getLeadIdByEmail(email) {
        await this.createToken();

        const response = await this.request.get(this.baseAPI + '/leads', {
            headers: {
                Authorization: this.token
            },
            params: {
                email: email
            }

        })
        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text())
        return body.data[0].id;
    }

    async deleteLead(email){
        let leadId = await this.getLeadIdByEmail(email);

        const response = await this.request.delete(this.baseAPI +'/leads/'+leadId,{
            headers:{
                Authorization: this.token
            }
        })
        expect(response.ok()).toBeTruthy();
    }
}