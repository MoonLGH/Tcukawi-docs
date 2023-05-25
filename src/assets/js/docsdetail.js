let converter = new showdown.Converter()

let docsbase = "https://raw.githubusercontent.com/MoonLGH/Tcukawi-Api/main/docs/"
function joindocs(url){
    return docsbase + url.replace("./docs/","")
}
let paths = {}

async function main(){
    let path = new URLSearchParams(window.location.search).get("path")
    if(!path){
        path = paths[paths["config"]["default"]]
        console.log(path)
    }

    let res = await (await fetch(joindocs(path))).text()
    res = converter.makeHtml(res)
    console.log(res)

    if(!path.includes("API") && !path.includes("INTERFACE")){
        document.querySelector("#content").innerHTML = res
    }
}
