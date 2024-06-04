import { Injectable, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import { Response } from 'express'; // Import Response from express
import * as csv from 'csv-parser'
import { UpdateRowLabel, LabelClasses } from './dtos/UpdateRow.dto';
import { Express } from 'express'

// Id,PostTypeId,AcceptedAnswerId,ParentId,CreationDate,DeletionDate,Score,ViewCount,Body,OwnerUserId,OwnerDisplayName,LastEditorUserId,LastEditorDisplayName,LastEditDate,LastActivityDate,Title,Tags,AnswerCount,CommentCount,FavoriteCount,ClosedDate,CommunityOwnedDate,ContentLicense
interface Row {
    Id: string,
    PostTypeId: string,
    AcceptedAnswerId: string,
    ParentId: string,
    CreationDate: string,
    DeletionDate: string,
    Score: string,
    ViewCount: string,
    Body: string,
    OwnerUserId: string,
    OwnerDisplayName: string,
    LastEditorUserId: string,
    LastEditorDisplayName: string,
    LastEditDate: string,
    LastActivityDate: string,
    Title: string,
    Tags: string,
    AnswerCount: string,
    CommentCount: string,
    FavoriteCount: string,
    ClosedDate: string,
    CommunityOwnedDate: string,
    ContentLicense: string,
    Label: LabelClasses,
}



@Injectable()
export class AppService {
    async getAnalytics() {
        const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
        const totalPosts = data.length;
        const totalQuestions = data.filter((row: Row) => row.PostTypeId == '1').length;
        const totalAnswers = data.filter((row: Row) => row.PostTypeId == '2').length;
        const labeledPosts = data.filter((row: Row) => row.Label ).length;
        const labeledQuestions = data.filter((row: Row) => row.PostTypeId == '1' && row.Label ).length;
        const labeledAnswers = data.filter((row: Row) => row.PostTypeId == '2' && row.Label ).length;
        // now the percentage of labeled questions and answers
        const percentageLabeledQuestions = ((labeledQuestions / totalQuestions) * 100).toFixed(2);
        const percentageLabeledAnswers = ((labeledAnswers / totalAnswers) * 100).toFixed(2);
        const percentageLabeledPosts = ((labeledPosts / totalPosts) * 100).toFixed(2);
        // percentage of "1" labels in questions and answers 
        const relevantPosts = data.filter((row: Row) => row.Label && row.Label.toString() == '1').length;
        const irrelevantPosts = data.filter((row: Row) => !row.Label || row.Label.toString() == '0').length;
        const percentageRelevantPosts = labeledPosts > 0 ? ((relevantPosts / labeledPosts) * 100).toFixed(2) : 0;

        return {
            totalPosts,
            totalQuestions,
            totalAnswers,
            labeledPosts,
            labeledQuestions,
            percentageLabeledPosts,
            labeledAnswers,
            percentageLabeledQuestions,
            percentageLabeledAnswers,
            relevantPosts,
            irrelevantPosts,
            percentageRelevantPosts,
        };
    }

    // check if the file exists
    async fileExists() : Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.access('data/data.json', fs.constants.F_OK, (err) => {
                if (err) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    // get a specific row from the csv file
    async getRow(rowNumber: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
            let rowNumberInt = parseInt(rowNumber);
            rowNumberInt--;
            data[rowNumberInt] ? resolve(data[rowNumberInt]) : reject('Row not found');
        });
    }

    async getRowsCount(): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
            resolve(data.length);
        });
    }

    async getPostById(postId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream('data/data.json');
            stream.on('error', (err) => {
                reject(err);
            });
            stream.on('ready', () => {
                stream.pipe(csv())
                .on('data', (data: Row) => {
                    if (parseInt(data.Id) == parseInt(postId)) {
                        resolve(data);
                    }
                })
                .on('end', () => {
                    reject('Post not found');
                });
            });
        });
    }

    async updateRow(rowNumber: string, updateRowDto: UpdateRowLabel): Promise<any> {
        // update the row in the csv file and write the changes to the file
        return new Promise((resolve, reject) => {
            const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
            let rowNumberInt = parseInt(rowNumber);
            rowNumberInt--;
            if (data[rowNumberInt]) {
                data[rowNumberInt].Label = updateRowDto.Label;
                fs.writeFileSync('data/data.json', JSON.stringify(data, null, 2));
                resolve(data[rowNumberInt]);
            } else {
                reject('Row not found');
            }
        })
    }

    download(response: Response) {
        const filePath = 'data/data.json';
        response.setHeader('Content-Type', 'text/json');
        response.setHeader('Content-Disposition', 'attachment; filename=data.json');

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(response);
    }


    async upload(file: Express.Multer.File) : Promise<string> {
        // upload the file to the server and save it as data.json
        return new Promise((resolve, reject) => {
            try {
                const ext = file.originalname.split('.').pop();
                const filePath = `data/data.${ext}`;
                const fileStream = fs
                    .createWriteStream(filePath);
                fileStream.write(file.buffer);
                fileStream.end();
                resolve('File uploaded successfully');
            } catch (err) {
                reject(err);
            }
        });
    }

    async deleteFile(response: Response) {
        // delete the file from the server
        return new Promise((resolve, reject) => {
            try {
                const filePath = 'data/data.json';
                fs.renameSync(filePath, `${filePath}.deleted`);
                resolve('File deleted successfully');
            } catch (err) {
                reject(err);
            }
        });
    }

    goToNextUnlablled(startIndex : number) {
        return new Promise((resolve, reject) => {
            try {
                const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
                startIndex -= 1;
                for (let i = startIndex; i < data.length; i++) {
                    if(!data[i]?.Label) {resolve(i+1);}
                }
                resolve(data.length + 1);
            } catch (err) {
                reject(err);
            }
        })
    }
}
