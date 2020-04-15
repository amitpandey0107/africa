import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AppStorage } from '@shared/for-storage/universal.inject';

// const BASE_PATH = "http://localhost:3001";
 const BASE_PATH = "http://dev.gdsoftwares.com:3001";

@Injectable()
export class ApiService {
    constructor(private http: HttpClient, @Inject(AppStorage) private appStorage: Storage) { }
    public token: string = this.appStorage.getItem('token');
    request: any;
    //login API
    login(json) {
        console.log(json);
        return this.http.post<any>(BASE_PATH + '/api/v1/login', json);
    }
    //sign up API
    signUp(json) {
        return this.http.post<any>(BASE_PATH + '/api/v1/registerUser', json);
    }
    //email availibility
    verifyEmail(email) {
        return this.http.get<any>(BASE_PATH + '/api/v1/searchEmail/?email=' + email);
    }
    //upload signature file
    uploadSignature(json){
        return this.http.post<any>(BASE_PATH + '/api/v1/uploadUserSign',json);
    }
    uploadProfile(json){
        return this.http.post<any>(BASE_PATH + '/api/v1/uploadUserProfilePhoto',json);
    }
    
    //fetch deals API
    fetchDeals(url) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.get<any>(BASE_PATH + '/api/v1/getDealList?'+url, httpOptions);
    }
    getNotifications(url) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': this.token
            })
        };
        return this.http.get<any>(BASE_PATH + '/api/v1/getNotifications?'+url, httpOptions);
    }
    fetchDealsOld() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.get<any>('http://dev.gdsoftwares.com:3000/listings/browse', httpOptions);
    }
    //Create new Deal
    postDeal(json) {
        return this.http.post<any>(BASE_PATH + '/api/v1/createNewDeal', json);
    }
    sendConversationRequest(json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': this.token
            })
        };
        return this.http.post<any>(BASE_PATH + '/api/v1/sendConversationRequest', json, httpOptions);
    }
    acceptDeclineRequest(json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': this.token
            })
        };
        return this.http.post<any>(BASE_PATH + '/api/v1/setConvoStatus', json, httpOptions);
    }
    deleteConvo(json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': this.token
            })
        };
        return this.http.post<any>(BASE_PATH + '/api/v1/setConvoStatus', json, httpOptions);
    }
    //Update New deal
    updateDeal(json, id) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': this.token
            })
        };
        return this.http.post<any>(BASE_PATH + '/listings/old/'+id, json, httpOptions);
    }

    getProfile(token) {
        const httpOptions = {
            headers: new HttpHeaders({
                'token': token
            })
        };
        return this.http.get<any>(BASE_PATH + '/account/profile', httpOptions);
    }
    getUserDeatils(token,url) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token
            })
        };
        return this.http.get<any>(BASE_PATH + '/api/v1/getUsersList?'+url, httpOptions);
    }
    getRegionList() {
        return this.http.get<any>(BASE_PATH + '/api/v1/getRegionList');
    }
    getSubRegionList(id) {
        return this.http.get<any>(BASE_PATH + '/api/v1/getSubRegionList?regionID='+id);
    }
    getCountryList(id) {
        return this.http.get<any>(BASE_PATH + '/api/v1/getCountryList?subRegionID='+id);
    }
    getCategoryList(){
        return this.http.get<any>(BASE_PATH + '/api/v1/getBusinessCatList');

    }
    getSubCategoryList(id){
        return this.http.get<any>(BASE_PATH + '/api/v1/getSubBusinessCatList?businessCategoryID='+id);

    }
    emailVerification(token){
        return this.http.post<any>(BASE_PATH + '/account/email-verification/'+token, {}, {})
    }

    


    //Upload file from messages
    uploadFile(data, token) {
        const httpOptions = {
            headers: new HttpHeaders({
                'token': token
            })
        };
        return this.http.post<any>(BASE_PATH + '/register/signup', data, httpOptions);
    }

    updateProfile(data, token) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        return this.http.post<any>(BASE_PATH + '/api/v1/updateProfile', data, httpOptions);
    }
    getUnreadMessageCount(id) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': this.token
            })
        };
        return this.http.get<any>(BASE_PATH + '/api/v1/getUnreadMessageCount?userID='+id, httpOptions);
    }
    getUnreadNotificationCount(id) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': this.token
            })
        };
        return this.http.get<any>(BASE_PATH + '/api/v1/getUnreadNotificationCount?userID='+id, httpOptions);
    }
    uploadBusinessLogo(data, token) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        return this.http.post<any>(BASE_PATH + '/api/v1/uploadBusinessLogo', data);
    }
    uploadMessageMedia(data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': this.token
            })
        };
        return this.http.post<any>(BASE_PATH + '/api/v1/sendFiles', data, httpOptions);
    }
    uploadProfilePicture(data, token) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        return this.http.post<any>(BASE_PATH + '/api/v1/uploadUserPicture', data);
    }
    uploadUserVideo(data, token) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data'
            })
        };
        let fileUploadProgress = '%';
        return this.http.post<any>(BASE_PATH + '/api/v1/uploadUserVideo', data,{
            reportProgress: true,
            observe: 'events'   
          }).subscribe(events => {
            if(events.type === HttpEventType.UploadProgress) {
            fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
              console.log(fileUploadProgress);
            } else if(events.type === HttpEventType.Response) {
              fileUploadProgress = '';
              console.log(events.body);          
              alert('SUCCESS !!');
            }
               
          }) ;
    }
    verifyCode(code) {
        return this.http.get<any>(BASE_PATH + '/register/invite-code/' + code);
    }

    //sign up API
    sendNCNDA(json) {
        return this.http.post<any>(BASE_PATH + '/register/ncnda', json);
    }

    


    //deals API
    fetchDeal(id) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.get<any>(BASE_PATH + '/api/v1/getDealList?pageNum=1&pageSize=100&sortDate=-1', httpOptions);
    }

    myDeals(token) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': token
            })
        };
        return this.http.get<any>(BASE_PATH + '/api/v1/getUsersList?userID=5e39ed2ad471ae2c8c10b0a2', httpOptions);
    }


    


   forgotPassword(json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<any>(BASE_PATH + '/account/forgotPassword', json, httpOptions);
    }

    //Verify that email + UID is valid to reset password
    checkForgotPassword(email, uid){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.get<any>(BASE_PATH + '/account/verify-email/'+email+'/'+uid, httpOptions);
    }


    //Update viewed onboarding info
    viewedOnboarding(id, token){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': token
            })
        };
        return this.http.get<any>(BASE_PATH + '/account/onboarding/'+id, httpOptions);
    }


    //Enter in new password from forgot password
    enterForgotPassword(email, uid, json){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<any>(BASE_PATH + '/account/verify-email/'+email+'/'+uid, json, httpOptions);
    }

    //User details API
    getUserInfo(id) {
        const httpOptions = {
            headers: new HttpHeaders({
                'token': this.token
            })
        };
        return this.http.get<any>(BASE_PATH + '/listings/user/' + id, httpOptions);
    }

    getAllUser(userType, limit, page) {
        this.request =  '?userType='+userType+'&limit='+limit+'&page='+page;
        const httpOptions = {
            headers: new HttpHeaders({
                'token': this.token
            })
        };
        return this.http.get<any>(BASE_PATH + '/account/all' + this.request, httpOptions);
    }

    updateUser(request) {
        const httpOptions = {
            headers: new HttpHeaders({
                'token': this.token
            })
        };
        return this.http.put<any>(BASE_PATH + '/account/all' + request, httpOptions);
    }

    //verify API
    sendVerifyRequest(json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'token': this.token
            })
        };
        return this.http.post<any>(BASE_PATH + '/account/sendVerifyRequests', json, httpOptions);
    }

    getVerifyRequest() {
        const httpOptions = {
            headers: new HttpHeaders({
                'token': this.token
            })
        };
        return this.http.get<any>(BASE_PATH +  '/account/getVerifyMeRequest', httpOptions);
    }
    getMessages(json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': this.token
            })
        };
        return this.http.get<any>(BASE_PATH + '/api/v1/getMessages' + json, httpOptions);
    }
    getConversations(json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': this.token
            })
        };
        return this.http.get<any>(BASE_PATH + '/api/v1/getConversations' + json, httpOptions);
    }
    setReadNotification(json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': this.token
            })
        };
        return this.http.post<any>(BASE_PATH + '/api/v1/setReadNotification', json, httpOptions);
    }
    deleteVerifyRequest(json) {
        const httpOptions = {
            headers: new HttpHeaders({
                'token': this.token
            })
        };
        return this.http.delete<any>(BASE_PATH + '/account/sendVerifyRequests/' + json.requestID, httpOptions);
    }

    //get meta data api
    getCountries() {
        return this.http.get<any>('http://dev.gdsoftwares.com:3000/metadata/country');
    }

    getPositionTypes() {
        return this.http.get<any>(BASE_PATH + '/metadata/positions');
    }

    getCryptoCurrency() {
        return this.http.get<any>('http://dev.gdsoftwares.com:3000/metadata/cryptoCurrency');
    }

    getGrossList() {
        return this.http.get<any>(BASE_PATH + '/metadata/grossDiscount');
    }
}
