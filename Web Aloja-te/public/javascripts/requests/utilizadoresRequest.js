async function requestSignup(name, email, pass) {
    try {
        const response = await fetch(`/api/utilizadores/`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
              name: name,
              email: email,
              pass: pass
          })
        });
        // We are not checking for errors (considering the GUI is only allowing correct choices)
        // We only need to send if the user registered or not 
        return { successful: response.status == 200};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestLogin(email, pass) {
    try {
        const response = await fetch(`/api/utilizadores/auth`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
              email: email,
              pass: pass
          })
        });
        // We are not checking for errors (considering the GUI is only allowing correct choices)
        // We only need to send if the user logged or not since the token will be in the cookie
        return { successful: response.status == 200};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}


async function requestLogout() {
    try {
        const response = await fetch(`/api/utilizadores/auth`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "DELETE",
        });
        // We are not checking for errors (considering the GUI is only allowing correct choices)
        // We only need to send if the user logged or not since the token will be in the cookie
        return { successful: response.status == 200};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}


async function requestProfile() {
    try {
        const response = await fetch(`/api/utilizadores/auth`);
        var result = await response.json();
        return { successful: response.status == 200,
                 unauthenticated: response.status == 401,
                 utilizador: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}
