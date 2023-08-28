let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

//total 
function getTotal() 
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.innerHTML = 'Nothing To Calcule';
        total.style.background = 'rgb(114, 10, 10)';
    }
}


//create product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

submit.onclick = function (){
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    
    
    if(mood === 'create'){
        //count
        if(newPro.count > 1){
            for(let i=0; i < newPro.count; i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
        //
    }else{
        dataPro[tmp] = newPro; //dataPro[i] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
        total.style.background = 'green';
    }
    
    
    //Save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro));

    clearData();
    showData();
    
}


//Clear inputs
function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerText = '';
    count.value = '';
    category.value = '';
}


//Read data
function showData()
{
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += 
                `<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                </tr>` ;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if(dataPro.length >0){
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>        
        `
    }else{
        btnDeleteAll.innerHTML = '';
    }
}
showData();


//delete
function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

//deleteAll
function deleteAll()
{
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


//update
function updateData(i)
{
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    category.value = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    
    mood = 'update';
    tmp = i;

    scroll({
        top:0,
        behavior:'smooth',
    })
}





// ...








        