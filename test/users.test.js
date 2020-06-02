let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const User = require("../sequelize/models/User");

chai.use(chaiHttp);

const userSample = {
  pseudo: "Jane Doe",
  score: 10,
};
const errorKeys = ["status", "message"];
const userKeys = ["uuid", "pseudo", "score", "createdAt", "updatedAt"];
let user;

describe("User", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    user = {
      ...userSample,
    };
    user = await User.create(user);
  });

  describe("GET USERS", () => {
    it("should return collection of users", async () => {
      try {
        const res = await chai.request(server).get("/users");

        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        res.body[0].should.have.keys(userKeys);
        res.body[0].should.include(userSample);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("POST NEW USER", () => {
    it("should post a new user", async () => {
      try {
        const res = await chai.request(server).post("/users").send(userSample);
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(userKeys);
      } catch (err) {
        throw err;
      }
    });
  });
});
