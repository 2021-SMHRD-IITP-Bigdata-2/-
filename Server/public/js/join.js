const email = document.querySelector(".login_email input")
const name = document.querySelector(".login_name input")
const nickname = document.querySelector(".login_nickname input")
const password = document.querySelector(".login_password input")
const phone = document.querySelector(".login_phone input")
const language = document.querySelector("login_language option")

const btn = document.querySelector(".login_btn")

// // get방식
// console.log(btn)
// btn.addEventListener("click",()=>{
//     axios.get("http://localhost:3000/join123").then((response)=>{
//         console.log(response.data[0].id)
//     })
// })



// post 방식
btn.addEventListener("click",()=>{
    // 콘솔 띄워서 확인해보자
    console.log(email.value)
    console.log(name.value)
    console.log(nickname.value)
    console.log(password.value)
    console.log(phone.value)
    console.log(language.value)


    axios.post("http://localhost:3000/join",{
        "user_id": email.value,
        "user_pwd": password.value,
        "user_name": name.value,
        "user_nick": nickname.value,
        "user_phone": phone.value,
        "user_national": language.value

    }).then((response)=>{
        console.log(response)
    })
});
