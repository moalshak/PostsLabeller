"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const csv = require("csv-parser");
let AppService = class AppService {
    async getAnalytics() {
        const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
        const totalPosts = data.length;
        const totalQuestions = data.filter((row) => row.PostTypeId == '1').length;
        const totalAnswers = data.filter((row) => row.PostTypeId == '2').length;
        const labeledPosts = data.filter((row) => row.Label).length;
        const labeledQuestions = data.filter((row) => row.PostTypeId == '1' && row.Label).length;
        const labeledAnswers = data.filter((row) => row.PostTypeId == '2' && row.Label).length;
        const percentageLabeledQuestions = ((labeledQuestions / totalQuestions) * 100).toFixed(2);
        const percentageLabeledAnswers = ((labeledAnswers / totalAnswers) * 100).toFixed(2);
        const percentageLabeledPosts = ((labeledPosts / totalPosts) * 100).toFixed(2);
        const relevantPosts = data.filter((row) => row.Label && row.Label.toString() == '1').length;
        const irrelevantPosts = data.filter((row) => !row.Label || row.Label.toString() == '0').length;
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
    async fileExists() {
        return new Promise((resolve, reject) => {
            fs.access('data/data.json', fs.constants.F_OK, (err) => {
                if (err) {
                    reject(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    async getRow(rowNumber) {
        return new Promise((resolve, reject) => {
            const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
            let rowNumberInt = parseInt(rowNumber);
            rowNumberInt--;
            data[rowNumberInt] ? resolve(data[rowNumberInt]) : reject('Row not found');
        });
    }
    async getRowsCount() {
        return new Promise((resolve, reject) => {
            const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
            resolve(data.length);
        });
    }
    async getPostById(postId) {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream('data/data.json');
            stream.on('error', (err) => {
                reject(err);
            });
            stream.on('ready', () => {
                stream.pipe(csv())
                    .on('data', (data) => {
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
    async updateRow(rowNumber, updateRowDto) {
        return new Promise((resolve, reject) => {
            const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
            let rowNumberInt = parseInt(rowNumber);
            rowNumberInt--;
            if (data[rowNumberInt]) {
                data[rowNumberInt].Label = updateRowDto.Label;
                fs.writeFileSync('data/data.json', JSON.stringify(data, null, 2));
                resolve(data[rowNumberInt]);
            }
            else {
                reject('Row not found');
            }
        });
    }
    download(response) {
        const filePath = 'data/data.json';
        response.setHeader('Content-Type', 'text/json');
        response.setHeader('Content-Disposition', 'attachment; filename=data.json');
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(response);
    }
    async upload(file) {
        return new Promise((resolve, reject) => {
            try {
                const ext = file.originalname.split('.').pop();
                const filePath = `data/data.${ext}`;
                const fileStream = fs
                    .createWriteStream(filePath);
                fileStream.write(file.buffer);
                fileStream.end();
                resolve('File uploaded successfully');
            }
            catch (err) {
                reject(err);
            }
        });
    }
    async deleteFile(response) {
        return new Promise((resolve, reject) => {
            try {
                const filePath = 'data/data.json';
                fs.renameSync(filePath, `${filePath}.deleted`);
                resolve('File deleted successfully');
            }
            catch (err) {
                reject(err);
            }
        });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map