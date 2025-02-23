let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let aDelete = document.getElementById('allDelete')
let mood = 'creat';
let tmp;

// get total
function getTotal(){
    if(price.value != ''){
        total.innerHTML= (+price.value + +taxes.value + +ads.value) - +discount.value;
    }
    else{
        total.innerHTML='';
    }
}

// creat proudect
let dataPro
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro=[];
}
submit.onclick = function(){
    let newPro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    if(title.value != '' && price.value != '' && count.value <= 100 ){
       if(mood === "creat"){
        
        //count
        if(newPro.count > 1){
            for(let i=0;newPro.count>i;i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }//-------------------
       }else{
            dataPro[tmp] = newPro;
            mood='creat';
            submit.innerHTML='Creat';
            count.style.display='block';
        }
         clearData();
    }

    localStorage.setItem("product", JSON.stringify(dataPro) );
    showData()
}

//clear inputs
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

//read
function showData(){
    let table = '';
    for(let i=0 ; i < dataPro.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete ">delete</button></td>
        </tr>`  
    }

    document.getElementById('tbody').innerHTML = table;
}

//All Delete
aDelete.onclick = function(){
    dataPro=[];
    localStorage.clear();
    showData();
}

//delet
function deleteData(n){
    dataPro.splice(n, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}


//update
function updateData(n){
    title.value = dataPro[n].title;
    price.value = dataPro[n].price;
    taxes.value = dataPro[n].taxes;
    ads.value = dataPro[n].ads;
    discount.value = dataPro[n].discount;
    total.innerHTML = dataPro[n].total;//getTotal();
    count.style.display='none';
    category.value = dataPro[n].category;
    submit.innerHTML = 'Update';
    mood= 'update';
    tmp=n;
    
}


//search
let searchMood='title';
function getSearchMood(id){
    let search = document.getElementById('search');
    search.focus()
    if(id == 'searchTitle'){
        searchMood='title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood='category';
        search.placeholder = 'Search By Category';
    }
    search.value='';
    showData();
 }

 function searchData(value){
    let table ='';
    for(let i=0;dataPro.length>i;i++){
        if( searchMood == 'title'){
        
            if (dataPro[i].title.includes(value)){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete ">delete</button></td>
                </tr>`  
            }
        }else{
        
            if (dataPro[i].category.includes(value)){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete ">delete</button></td>
                </tr>`  
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
 }
