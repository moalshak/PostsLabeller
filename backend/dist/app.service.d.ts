/// <reference types="multer" />
import { Response } from 'express';
import { UpdateRowLabel } from './dtos/UpdateRow.dto';
export declare class AppService {
    getAnalytics(): Promise<{
        totalPosts: any;
        totalQuestions: any;
        totalAnswers: any;
        labeledPosts: any;
        labeledQuestions: any;
        percentageLabeledPosts: string;
        labeledAnswers: any;
        percentageLabeledQuestions: string;
        percentageLabeledAnswers: string;
        relevantPosts: any;
        irrelevantPosts: any;
        percentageRelevantPosts: string | number;
    }>;
    fileExists(): Promise<boolean>;
    getRow(rowNumber: string): Promise<any>;
    getRowsCount(): Promise<any>;
    getPostById(postId: string): Promise<any>;
    updateRow(rowNumber: string, updateRowDto: UpdateRowLabel): Promise<any>;
    download(response: Response): void;
    upload(file: Express.Multer.File): Promise<string>;
    deleteFile(response: Response): Promise<unknown>;
}
