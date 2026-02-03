
const url = "https://lh3.googleusercontent.com/a/ACg8ocLaljaU28dvcRPKsIZciWtMyvNFIEXPRM63MYj-STzO36sNj9N3=s96-c";
fetch(url, { referrerPolicy: "no-referrer" }).then(res => {
    console.log("Status:", res.status);
    console.log("Type:", res.headers.get("content-type"));
}).catch(err => console.error(err));
