async function duedate() {
    console.log("[client ruta spre duedate]");
    try {
        const response = await fetch("http://127.0.0.1:3007/api/v1/duedate", {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({}),
        });
        console.log(response);

        if (!response.ok) {
            throw new Error("duedate failed!");
        }
    } catch (error) {
        console.error(error);
    }
}
