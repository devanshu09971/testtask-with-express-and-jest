import axios from 'axios'
import { Response, Request } from 'express';
import { KYCValidate } from '../interfaces';
import { CutomLogger } from '../config/logger';
import { TOKEN, API_END_POINT } from '../constants/constants';
 
/**
 * Check KYC .
 * @route GET /
 */
export const getKYC = async (req: Request, res: Response) => {
    CutomLogger.logger.log('info', "Server is runnig");
    res.send({ 'message': 'Server is runnig.' })
}

/**
 * Check KYC .
 * @route POST /
 */
export const postKYC = async (req: Request, res: Response) => {

    const headersOpts = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    }

    const { birthDate, givenName, middleName, familyName, licenceNumber, stateOfIssue, expiryDate } = req.body;
    
    let sampleData: KYCValidate = {
        birthDate: birthDate,
        givenName: givenName,
        middleName: middleName,
        familyName: familyName,
        licenceNumber: licenceNumber,
        stateOfIssue: stateOfIssue,
        expiryDate: expiryDate,
    };
    
    try {
        const getResponse = await axios.post(API_END_POINT, sampleData, {
            headers: headersOpts
        })
        return res.status(200).json(sendResponse(getResponse.data));
    } catch (error) {
        CutomLogger.logger.log('error', "error : "+error);
        return res.status(405).json(error.message);
    }
};

function sendResponse(data: any) {

    let sendResponse: any = {};     
    switch (data.verificationResultCode) {
        case 'Y':
            sendResponse.kycResult = true
            break;
        case 'N':
            sendResponse.kycResult = false
            break;
        case 'D':
            sendResponse.kycResult = false
            sendResponse.code = data.verificationResultCode
            sendResponse.message = 'Document Error'
            break;
        case 'S':
            sendResponse.kycResult = false
            sendResponse.code = data.verificationResultCode
            sendResponse.message = 'Server Error'
            break;
        default:
            sendResponse.kycResult = false
            break;
    }
    return sendResponse;
}
