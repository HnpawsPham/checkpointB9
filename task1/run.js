let menu=JSON.parse(localStorage.getItem("menu")) || [" rau xào"," thịt luộc"," gà rán"]

const search=document.getElementById("search")
const list=document.getElementById("list")

$("#alert").hide()

search.addEventListener("keypress",function(e){
    $("#alert").show()
    //show menu
    if(e.key=="R"){
       createItem()
    }
    //update menu
    else if(e.key=="U"){
        updateItem()
    }

    else if(e.key=="C"){
        addItem()
    }
    else if(e.key=="D"){
        deleteItem()
    }
    localStorage.setItem("menu",JSON.stringify(menu))
})


function addItem(){
    notification("Mời người dùng nhập vào tên món muốn thêm")
    
    search.addEventListener("keypress",function(e){
        if(e.key=="Enter"){
            let input=search.value
            if(search.value != "" && search.value != " "){
                if(!duplicated(input)){
                    notification("Đã thêm thành công món mới")
                    menu.push(" "+input)
                    localStorage.setItem("menu",JSON.stringify(menu))

                    location.reload()
                }
                else if(duplicated(input)){
                    notification("Món ăn đã tồn tại")
                }
            }
        }
    })
}
function createItem(){
    for(let item of menu){
        let line=document.createElement("li")
        line.innerHTML=item
        list.appendChild(line)
    }
}
function updateItem(){
   notification("Mời người dùng nhập vào tên món muốn update")
    
    search.addEventListener("keypress",function(e){
        if(e.key=="Enter"){
            let index=menu.indexOf(" "+search.value)

            if(index != -1 && search.value != "" && search.value != " "){
                notification("Nhập món ăn muốn đổi")

                search.addEventListener("keypress",function(e){
                    if(e.key=="Enter"){
                        menu[index]=" "+search.value
                        notification("Cập nhật thành công")
                        localStorage.setItem("menu",JSON.stringify(menu))

                        location.reload()
                    }
                })
            }
            else{
                notification("Không tìm thấy món ăn")
            }
        }
    })
}
function deleteItem(){
    notification("Mời người dùng nhập vào tên món muốn Delete")

    search.addEventListener("keypress",function(e){
        if(e.key=="Enter"){
            let index=menu.indexOf(" "+search.value)
            if(index != -1 && search.value != "" && search.value != " "){
                menu.splice(index,1)
                localStorage.setItem("menu",JSON.stringify(menu))
                notification("Đã xóa món ăn thành công")
                search.value=""
                location.reload()
            }
            else{
                notification("Không tìm thấy món ăn")
            }
        }
    })
}
function notification(text){
    $("#noti").text(text)
}
function duplicated(item){
    if(menu.indexOf(" "+item) == -1){
        return false
    }
    return true
}
