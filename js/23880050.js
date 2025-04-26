const API = "https://web1-api.vercel.app/api";
const AUTHENTICATE_API = "https://web1-api.vercel.app/users";
// cách lấy data ta từ API về
async function loadData(request, templateId, viewId) {
    const response = await fetch(`${API}/${request}`);
    const data = await response.json();



    var source = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(source);
    var context = { data: data };
    var view = document.getElementById(viewId);
    view.innerHTML = template(context);
}

async function getAuthenticateToken(username, password) {
    let response = await fetch(`${AUTHENTICATE_API}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    }); // tới linh users/authenticate để lấy phần xác nhận gởi mail
    let result = response.json();
    if (response.status == 200) {
        return result.token; // trả về token, laays token để xác thực người dùng
    } else {
        throw new Error("Authentication failed");
    }
}