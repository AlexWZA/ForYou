const ACCESS_KEY = "8a5453d4-39a8-44d1-ae0c-4b2eee513c56";

async function notifyClick(pageName, destination) {
    try {
        await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                access_key: ACCESS_KEY,
                subject: "Website Link Clicked",
                name: "Website Tracker",
                email: "tracker@example.com",
                message: pageName + " was clicked.\n\nTime: " + new Date().toLocaleString()
            })
        });
    } catch (err) {
        console.error(err);
    }

    window.location.href = destination;
}