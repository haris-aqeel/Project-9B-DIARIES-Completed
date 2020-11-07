import {Server, Model, Factory ,hasMany, belongsTo, Response} from 'miragejs';

import {addEntry, create, getDiaries, getEntries, updateDiary, updateEntry} from '../Routes/Diary/diary'

import {login, signup} from '../Routes/User/user' 

import * as diary from '../Routes/Diary/diary'


export const handleErrors = (error: any, message = 'An error ocurred') => {
    return new Response(400, undefined, {
      data: {
        message,
        isError: true,
      },
    });
  };


export const setupServer = (env? : string): Server => {
    return new Server({

        environment: env ?? "development",

        models: {

            // Here we Will specify the difference associations or Relations between different components we 
            // will create later on.

            user: Model.extend({

                diary: hasMany()

            }),

            dairy: Model.extend({

                user: belongsTo(),
                entry: hasMany()

            }),

            entry: Model.extend({

                diary: belongsTo()

            })

        },


        factories: {

            user: Factory.extend({

                username: 'test',
                password: 'hello123',
                email: 'abc@gmail.com'

            })

        },

        seeds: (server) => {

            server.create('user')
        
        },

        routes() : void{

            this.urlPrefix =  "https://diaries.app";

            this.get('/diaries/:id', diary.getDiaries);
            this.get('/diaries/entries/:id', diary.getEntries);

            this.post('/diaries', diary.create);
            this.post('/diaries/entries/:id', diary.addEntry);

            this.put('/diaries/:id', diary.updateDiary);
            this.put('/diaries/entries/:id', diary.updateEntry);

            this.post('/auth/login', login);
            this.post('/auth/signup', signup)

        },

    


    })
}