import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { Types } from "mongoose";
import { AppModule } from "src/app.module";
import { CreateReviewDto } from "src/review/dto/create-review.dto";

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
    name: 'Test',
    title: 'Title-test',
    description: 'Description of title',
    rating: 5,
    productId
};

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createId: string;

    beforeEach(async ()=> {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
    })

    it('/review/create (POST)',async (done)=>{
        return request(app.getHttpServer())
            .post('/review/crete')
            .send(testDto)
            .expect(201)
            .then(({body}: request.Response )=>{
                createId = body._id;
                expect(createId).toBeDefined();
                done();
            });

    });
});