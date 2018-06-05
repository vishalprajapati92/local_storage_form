
var isValidate = true;
// Check validation of form
var exisitingEntry = [];

document.getElementById('submitbtn').addEventListener('click', validationField);

function removeElementsByClass(className){
    elements = document.getElementsByClassName(className);
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
}  

function validationField()
{
    if(Array.isArray(exisitingEntry)) {
        console.log(true);
    } else {
        console.log(false);
    }
    console.log(exisitingEntry);
    return false;
    removeElementsByClass("error");
    checkEmptyStr('Username');
    checkEmptyStr('password');
    checkEmptyStr('E-mail');
    checkEmptyStr('contact');

    if(getRadioValue(document.getElementsByName('gender')) == undefined){
        var g = document.querySelector('#genderDv').insertAdjacentHTML('afterend', '<span class="error"> Please Select Gender </span>');
        isValidate = false;
      }
    
    if(isValidate)
    {
        storeInLocal();
    }
}

function checkEmptyStr(control){
    var currElement = document.getElementById(control);
    if(currElement == undefined || currElement.value == "" ){
      document.querySelector('#'+control).insertAdjacentHTML('afterend', '<span class="error"> Please Enter '+control+' </span>');
      isValidate = false;
    }
    else
    {
        isValidate = true;
    }
  }  

function getRadioValue()
{
    var radios = document.getElementsByName('gender');
    var radioValue;
    for (var i = 0; i < radios.length; i++) 
    {
            if (radios[i].checked)
             {
                radioValue =  radios[i].value;
                return radioValue;
                break;
            }
    }
    console.log(radioValue);
    return radioValue;
}

function storeInLocal()
{

    var UserName = document.getElementById('Username').value;
    var passwd = document.getElementById('password').value;
    var e_mail = document.getElementById('E-mail').value;
    var contct = document.getElementById('contact').value;
    var getGender = getRadioValue();

    var entry = {
        "Username" : UserName, 
        "password" : passwd,
        "email" : e_mail,
        "contact" : contct,
        "gender" : getGender
    };
    exisitingEntry.push(entry);
    localStorage.setItem("allEntry",JSON.stringify(exisitingEntry));
    secondTimeEntry(getGender);
}

function secondTimeEntry(getGender)
{
    document.querySelector('#createHeader').insertAdjacentHTML('afterend', '<tr> <td> '+ document.getElementById('Username').value  +' </td> <td>'+ document.getElementById('password').value  +'</td> <td>'+ document.getElementById('E-mail').value  +'</td><td>'+ document.getElementById('contact').value  +'</td><td>'+ getGender  +'</td> </tr>');
    resetAllFieldsValue();

}

function pageLoadFirstTime()
{
    exisitingEntry = (localStorage.getItem("allEntry")) ? JSON.parse(localStorage.getItem("allEntry")) : [];
    var x;
    document.querySelector('#tblDetail').insertAdjacentHTML('beforeend', '<tr id = "createHeader"><th> Username </th> <th> password </th> <th> Email </th> <th> Contact </th> <th> Gender </th> </tr>');
        for(x in exisitingEntry)
        {
            document.querySelector('#createHeader').insertAdjacentHTML('afterend', '<tr> <td> '+ exisitingEntry[x].Username  +' </td> <td>'+ exisitingEntry[x].password  +'</td> <td>'+ exisitingEntry[x].email  +'</td><td>'+ exisitingEntry[x].contact  +'</td><td>'+ exisitingEntry[x].gender  +'</td> </tr>');
        }
}

function resetAllFieldsValue()
{
    document.getElementById('Username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('E-mail').value = "";
    document.getElementById('contact').value = "";

    var radioBtnList  = document.getElementsByName('gender');
    for(var i=0; i<radioBtnList.length; i++)
    {
        if(radioBtnList[i].checked)
        {
            radioBtnList[i].checked = false;
        }
    }
}