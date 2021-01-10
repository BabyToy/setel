import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateDto } from "src/common/dto/create.dto";
import { VerifyDto } from "src/common/dto/verify.dto";
import { IOrder } from "src/common/interfaces/IOrder";
import { OrderState } from "src/common/orderState";

import { AppModule } from "./../src/app.module";

const request = require("supertest");
const assert = require("assert");

async function forIt(milliseconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

describe("Orders", () => {
  let app: INestApplication;
  let orderId: number | undefined = undefined;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Create order - forced decline", async () => {
    const body: CreateDto = {
      customerId: 1,
      item: 2,
      qty: 3,
      token: "test-token",
      jgnpsiqbjxkdudavkrmafdrq: false
    };
    const response = await request(app.getHttpServer())
      .post("/orders/create")
      .send(body)
      .set("Accept", "application/json");
    assert.strictEqual(response.status, HttpStatus.INTERNAL_SERVER_ERROR);
    const thisOrder: IOrder = response.body.order;
    assert.strictEqual(thisOrder.state, OrderState.CANCELLED);

    orderId = thisOrder.id;
    assert(orderId);
  });

  it("Verify order - forced decline", async () => {
    const body: VerifyDto = {
      id: orderId,
      token: "e2e-token"
    };
    const response = await request(app.getHttpServer())
      .post("/orders/verify")
      .send(body)
      .set("Accept", "application/json");
    assert.strictEqual(response.status, HttpStatus.OK);
    const thisOrder: IOrder = response.body.order;
    assert.strictEqual(thisOrder.state, OrderState.CANCELLED);
  });

  it("Create order - forced approval", async () => {
    const body: CreateDto = {
      customerId: 1,
      item: 2,
      qty: 3,
      token: "test-token",
      jgnpsiqbjxkdudavkrmafdrq: true
    };
    let response = await request(app.getHttpServer())
      .post("/orders/create")
      .send(body)
      .set("Accept", "application/json");
    assert.strictEqual(response.status, HttpStatus.OK);
    let thisOrder: IOrder = response.body.order;
    assert.strictEqual(thisOrder.state, OrderState.CONFIRMED);

    orderId = thisOrder.id;
    // wait for the payments service to process the order
    await forIt(11000);

    const verifyBody: VerifyDto = {
      id: orderId,
      token: "e2e-token"
    };
    response = await request(app.getHttpServer())
      .post("/orders/verify")
      .send(verifyBody)
      .set("Accept", "application/json");
    assert.strictEqual(response.status, HttpStatus.OK);
    thisOrder = response.body.order;
    assert.strictEqual(thisOrder.state, OrderState.DELIVERED);
  });
});
