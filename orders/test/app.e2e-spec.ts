import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import assert from "assert";
import { createDto } from "src/common/dto/create.dto";
import { verifyDto } from "src/common/dto/verify.dto";
import request from "supertest";

import { AppModule } from "./../src/app.module";

describe("Orders", () => {
  let app: INestApplication;
  let orderId: number | undefined = undefined;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("Create order - forced decline", async () => {
    const body: createDto = {
      customerId: 1,
      item: 2,
      qty: 3,
      token: "test-token",
      jgnpsiqbjxkdudavkrmafdrq: false
    };
    const response = await request(app.getHttpServer()).post("/orders/create").send(body);
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, "Order is cancelled");

    orderId = response.body.order.id as number;
    assert(orderId);
  });

  it("Verify order - forced decline", async () => {
    const body: verifyDto = {
      id: orderId,
      token: "e2e-token"
    };
    const response = await request(app.getHttpServer()).post("/orders/verify").send(body);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, "Order is cancelled");
  });

  it("Create order - forced approval", async () => {
    const body: createDto = {
      customerId: 1,
      item: 2,
      qty: 3,
      token: "test-token",
      jgnpsiqbjxkdudavkrmafdrq: true
    };
    const response = await request(app.getHttpServer()).post("/orders/create").send(body);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, "Order is confirmed");
  });

  it("Verify order - forced decline", async () => {
    const body: verifyDto = {
      id: orderId,
      token: "e2e-token"
    };
    const response = await request(app.getHttpServer()).post("/orders/verify").send(body);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, "Order is delivered");
  });
});
