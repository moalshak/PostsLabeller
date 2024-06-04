/// <reference types="multer" />
import { AppService } from './app.service';
import { UpdateRowLabel } from './dtos/UpdateRow.dto';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    fileExists(response: Response): Promise<void>;
    getRow(rowNumber: string, response: Response): Promise<any>;
    getPostById(postId: string): Promise<any>;
    updateRow(rowNumber: string, updateRowDto: UpdateRowLabel): Promise<any>;
    download(response: Response): Promise<any>;
    uploadFile(file: Express.Multer.File, response: Response): Promise<string>;
    deleteFile(response: Response): Promise<any>;
    getUploadForm(response: Response): void;
    getRowsCount(): Promise<any>;
    getAnalytics(): Promise<any>;
}
