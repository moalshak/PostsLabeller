import { Body, Controller, Get, Res, Param, Post, UseInterceptors, UploadedFile, Delete, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { UpdateRowLabel } from './dtos/UpdateRow.dto';
import { Response } from 'express'; // Import Response from express
import { Express } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Get("/file-exists")
    async fileExists(@Res() response: Response) {
        try {
            await this.appService.fileExists();
            response.status(200).json({message: 'File exists'});
        } catch (err) {
            response.status(404).json({error: 'File not found'});
        }
    }

    @Get('row/:rowNumber')
    async getRow(@Param('rowNumber') rowNumber: string,
    @Res() response : Response
    ): Promise<any> {
        try {
            var row = await this.appService.getRow(rowNumber);
            response.status(200).json(row);
            return row;
        } catch (err) {
            // 404
            response.status(404).json({error: 'Row not found'});
            return 'Row not found';
        }
    }

    @Get('post/:postId')
    async getPostById(@Param('postId') postId: string): Promise<any> {
        return this.appService.getPostById(postId);
    }

    @Post('row/:rowNumber')
    async updateRow(
        @Param('rowNumber') rowNumber: string,
        @Body() updateRowDto: UpdateRowLabel,
    ): Promise<any> {
        return this.appService.updateRow(rowNumber, updateRowDto);
    }

    // /download
    @Get('download')
    async download(@Res() response: Response): Promise<any> {
        return this.appService.download(response);
    }

    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, response : Response) {
        console.log(file);
        return this.appService.upload(file);
    }

    @Delete('delete')
    async deleteFile(@Res() response: Response): Promise<any> {
        return this.appService.deleteFile(response);
    }

    @Get('upload-form')
    getUploadForm(@Res() response: Response) {
        response.send(`
            <h1>Upload CSV File</h1>
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" name="file" required />
                <button type="submit">Upload</button>
            </form>
        `);
    }

    @Get('rows-count')
    async getRowsCount(): Promise<any> {
        try {
            return this.appService.getRowsCount();
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    @Get('analytics')
    async getAnalytics(): Promise<any> {
        return this.appService.getAnalytics();
    }

    @Get('next-unlabeled')
    async getNextUnlabled(
        @Query('startIndex') startIndex : string,
    ): Promise<any> {
        var startIndexAsNumber : number = parseInt(startIndex);
        return this.appService.goToNextUnlablled(startIndexAsNumber);
    }
}
