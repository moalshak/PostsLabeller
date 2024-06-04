"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_service_1 = require("./app.service");
const UpdateRow_dto_1 = require("./dtos/UpdateRow.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async fileExists(response) {
        try {
            await this.appService.fileExists();
            response.status(200).json({ message: 'File exists' });
        }
        catch (err) {
            response.status(404).json({ error: 'File not found' });
        }
    }
    async getRow(rowNumber, response) {
        try {
            var row = await this.appService.getRow(rowNumber);
            response.status(200).json(row);
            return row;
        }
        catch (err) {
            response.status(404).json({ error: 'Row not found' });
            return 'Row not found';
        }
    }
    async getPostById(postId) {
        return this.appService.getPostById(postId);
    }
    async updateRow(rowNumber, updateRowDto) {
        return this.appService.updateRow(rowNumber, updateRowDto);
    }
    async download(response) {
        return this.appService.download(response);
    }
    async uploadFile(file, response) {
        console.log(file);
        return this.appService.upload(file);
    }
    async deleteFile(response) {
        return this.appService.deleteFile(response);
    }
    getUploadForm(response) {
        response.send(`
            <h1>Upload CSV File</h1>
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" name="file" required />
                <button type="submit">Upload</button>
            </form>
        `);
    }
    async getRowsCount() {
        try {
            return this.appService.getRowsCount();
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
    async getAnalytics() {
        return this.appService.getAnalytics();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)("/file-exists"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "fileExists", null);
__decorate([
    (0, common_1.Get)('row/:rowNumber'),
    __param(0, (0, common_1.Param)('rowNumber')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getRow", null);
__decorate([
    (0, common_1.Get)('post/:postId'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Post)('row/:rowNumber'),
    __param(0, (0, common_1.Param)('rowNumber')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateRow_dto_1.UpdateRowLabel]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateRow", null);
__decorate([
    (0, common_1.Get)('download'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "download", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.Get)('upload-form'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUploadForm", null);
__decorate([
    (0, common_1.Get)('rows-count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getRowsCount", null);
__decorate([
    (0, common_1.Get)('analytics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAnalytics", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map