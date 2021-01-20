import * as kycController from './controllers/kyc';

export class Routes {
  public routes(app: any): void {
    app.route("/").get(kycController.getKYC);
    app.route("/kyc").post(kycController.postKYC);
  }
}