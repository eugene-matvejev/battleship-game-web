class APIRequestService extends Configuration {
    public pageMgr: PageMgr;

    constructor() {
        super();
        this.pageMgr = new PageMgr();
    }

    request(requestMethod: string, requestURL: string, requestData?: Object, onSuccess?: Function, onError?: Function) {
        let self = this;
        requestData = JSON.stringify(requestData);
        // requestURL = this.buildRequestURL(requestURL)+ '?XDEBUG_START_SESSION';
        requestURL = APIRequestService.buildRequestURL(requestURL);

        $.ajax(<any>{
            accepts: 'application/json',
            dataType: 'json',
            crossDomain: true,
            method: requestMethod,
            url: requestURL,
            data: requestData,
            timeout: APIRequestService.requestTimeout,
            beforeSend: function () {
                self.pageMgr.loadingMode(true);
                console.log(` >>> ${requestMethod} :: ${requestURL}`, requestData || '');
            },
            complete: function (jqXHR) {
                self.pageMgr.loadingMode(false);
                console.log(` >>> ${requestMethod} :: ${requestURL}`, jqXHR);
            },
            success: onSuccess,
            error: onError
        });
    }

    protected static buildRequestURL(requestPath: string) {
        return `${APIRequestService.requestProtocol}://${APIRequestService.requestHost}/${requestPath}`
    }
}

