const isValid = function(value){
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
}

const isValidMobile = function(mobile){
    return (/^[6-9]\d{9}$/).test(mobile)
}

const isValidInput = function(input){
    if(Object.keys(input).length == 0)   return false
    else{
        return true
    }
}  

const isValidEmail = function(email){
    return(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)
}

// Regex for College Validation--
const isValidString = function (college) {
    return (/^[a-zA-Z -.]{4,50}$/).test(college)

}
const isValidName = function (college) {
    return (/^[a-zA-Z-.  ]{2,10}$/).test(college)

}

const isValidUrl = function(Url){
    return(/^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/).test(Url)
}

module.exports = {isValid,isValidInput,isValidName,isValidString,isValidUrl,isValidMobile,isValidEmail}