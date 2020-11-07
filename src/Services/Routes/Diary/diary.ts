import {Response, Request} from 'miragejs'
// Interface Importing
import {User} from '../../../Interface/user.interface'
import {Diary} from '../../../Interface/diary.interface'
import { Entry } from '../../../Interface/entry.interface';
// Handle Errors Function Imported
import {handleErrors} from '../../MirageServer/server'
// Library for Data & Time Capture
import dayjs from 'dayjs';
//1.  CREATING A NEW DIARY 

export const create = (schema: any, req: Request): { user: User; diary: Diary } | Response => {

    try {
        const { titleofdiary, type, userid } = JSON.parse(req.requestBody)
        
        const otherUsers = schema.users.findBy({id: userid});

        if (!otherUsers){
            return handleErrors(null, "Sorry! We are not able to find you")
        }

        const now = dayjs().format();
        console.log(now)

        const diary = otherUsers.createDiary({
            titleofdiary,
            type,
            createdAt: now,
            updatedAt: now
        })

        return {
            user: {
              ...otherUsers.attrs,
            },
            diary: diary.attrs,
          };
    }
    catch (error) {
        return handleErrors(error, 'Failed to create Diary.');
      }
}

//2. ADDING A ENTRY IN A CREATED DIARY

export const addEntry = (schema: any, req: Request): { entry: Entry; diary: Diary } | Response => {

    try {

        const diary = schema.diaries.find(req.params.id);

        const {title, content} = JSON.parse(req.requestBody);

        const now = dayjs().format();

        const entry = diary.createEntry({
            
            title,
            content,
            createdAt: now,
            updatedAt: now
        
        })

        diary.update({
            ...diary.attrs,
            updatedAt: now
        })

        return {

            diary: diary.attrs,
            entry: entry.attrs
        };

     } catch (error) {
            return handleErrors(error, 'Failed to save entry.');
          }

    }



//3. LISTING ALL DIARIES OF A PARTICULAR USER

export const getDiaries = (schema: any, req: Request): Diary[] | Response => {

    try {
        const user = schema.users.find(req.params.id);
        return user.diary;
    }
    catch(error) {

        return handleErrors(error, "Failed to Retrieve any Diary of User")
    }

}

//4. GET ALL ENTRIES OF A PARTICULAR DIARY

export const getEntries = (schema: any, req: Request): Entry[] | Response => {

    try{
        const diary = schema.diaries.find(req.params.id)
        return diary.entry

    }catch(error) {

        return handleErrors(error, "Failed to Retrieve any Entry of Diaries")
    }

}

//5. UPDATING A PARTICULAR DIARY

export const updateDiary = (schema: any, req: Request): Diary | Response  => {

    try{

        const diary = schema.diaries.find(req.params.id);

        const data = JSON.parse(req.requestBody);

        const now = dayjs().format();

        diary.update({
            ...data,
            updatedAt: now

        })

        return diary.attrs;

        
    }catch(error) {

        return handleErrors(error, 'Failed to update Diary.');
    }

}

//6. UPDATING A PARTICULAR ENTRY FOR A SPECIFIC DIARY

export const updateEntry = (schema: any, req: Request): Entry | Response => {

    try {

        const entry = schema.entries.find(req.params.id);
        const data = JSON.parse(req.requestBody);
        const now = dayjs().format();

        entry.update({
            ...data,
            updatedAt: now
        })

        return entry.attrs

    } catch(error){

        return handleErrors(error, "Update Entry Failed!...")

    }

}