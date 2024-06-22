$.checkEmptyValue = (span, value) => {
    if (value){
        $(`#${span}`).html("")
        return true
    }
    $(`#${span}`).html("The input is required") 
    return false
}

$.checkMaxMinValue = (span, value, min, max) => {
    if(value.length > min && value.length < max){
        $(`#${span}`).html("")
        return true
    }
    $(`#${span}`).html(`The value requires the length with minimum ${min} letters and maximum ${max} letters`)
    return false
}

$.checkEmail = (span, value) => {
    if(value.length > min && value.length < max){
        $(`#${span}`).html("")
        return true
    }
    $(`#${span}`).html(`The email is not valid`)
    return false
}

