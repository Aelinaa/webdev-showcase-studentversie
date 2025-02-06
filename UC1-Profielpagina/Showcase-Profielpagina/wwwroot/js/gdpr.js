class GDPR {

    constructor() {
        this.showStatus();
        this.showContent();
        this.bindEvents();

        if(this.cookieStatus() !== 'Accepted' && this.cookieStatus() !== 'Rejected') this.showGDPR();
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--Accepted');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('Accepted');
            this.showStatus();
            this.showContent();
            this.hideGDPR();
        });

        //student uitwerking
        let buttonReject = document.querySelector('.gdpr-consent__button--Rejected');

        buttonReject.addEventListener('click', () => {
            this.cookieStatus('Rejected');
            this.showStatus();
            this.showContent();
            this.hideGDPR();
        });
    }

    showContent() {
        this.resetContent();
        const status = this.cookieStatus() == null ? 'not-chosen' : this.cookieStatus();
        const element = document.querySelector(`.content-gdpr-${status}`);
        element.classList.add('show');

    }

    resetContent(){
        const classes = [
            '.content-gdpr-Accepted',

//student uitwerking

            '.content-gdpr-not-chosen'
        ];

        for(const c of classes){
            document.querySelector(c).classList.add('hide');
            document.querySelector(c).classList.remove('show');
        }
    }

    showStatus() {
        document.getElementById('content-gpdr-consent-status').innerHTML =
            this.cookieStatus() == null ? 'Niet gekozen' : this.cookieStatus();
    }

    cookieStatus(status) {

        if (status) {
            localStorage.setItem('gdpr-consent-choice', status);
            this.saveMetaData();
        }

        //student uitwerking
       
        


        return localStorage.getItem('gdpr-consent-choice');
    }

//student uitwerking
    saveMetaData() {
        let today = new Date();
        var currentDate = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
        var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let metaData = { date: currentDate, time: currentTime }
        let result = JSON.stringify(metaData);
        localStorage.setItem('Meta Data', result);
    }


    hideGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('hide');
        document.querySelector(`.gdpr-consent`).classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('show');
    }

}

const gdpr = new GDPR();

