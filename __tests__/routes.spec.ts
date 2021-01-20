import request from "supertest";
import app from "../src/app";

describe('Post Endpoints', () => {
  it('It should 200 and return verificationResultCode in data object', async () => {
    const res = await request(app)
      .post('/kyc')
      .send({
          birthDate: "1985-02-08", 
          givenName: "James", 
          middleName: "Robert", 
          familyName: "Smith", 
          licenceNumber: "94977000", 
          stateOfIssue: "NSW", 
          expiryDate: "2020-01-01"
      })
      expect(res.status).toEqual(200);      
      expect(res.body).toHaveProperty('kycResult')
  })

  it('It should return 405, because birth date forrmat is not correct', async () => {
    const res = await request(app)
      .post('/kyc')
      .send({
          birthDate: "test", 
          givenName: "James", 
          middleName: "Robert", 
          familyName: "Smith", 
          licenceNumber: "94977000", 
          stateOfIssue: "NSW", 
          expiryDate: "2020-01-01"
      })
      expect(res.status).toEqual(405) 
  })

  it('It should return 405, because send empty object', async () => {
    const res = await request(app)
      .post('/kyc')
      .send({
          birthDate: "", 
          givenName: "", 
          middleName: "", 
          familyName: "", 
          licenceNumber: "", 
          stateOfIssue: "", 
          expiryDate: ""
      })
      expect(res.status).toEqual(405) 
  })

  it('It should return 404, because method not found', async () => {
    const res = await request(app)
      .post('/')
      .send({
          birthDate: "", 
          givenName: "", 
          middleName: "", 
          familyName: "", 
          licenceNumber: "", 
          stateOfIssue: "", 
          expiryDate: ""
      })
      expect(res.status).toEqual(404) 
  })

})
