let converter = new showdown.Converter({tables:true})

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

    if(!path.includes("API") && !path.includes("INTERFACE")){
        let res = await (await fetch(joindocs(path))).text()
        console.log(res)
        res = converter.makeHtml(res)
        console.log(res)
        document.querySelector("#content").innerHTML = res
    } else if(path.includes("API")){
        let res = await (await fetch(joindocs(path))).text()

        console.log(res)
        if(res.includes("-Params")){
            res = res.replace("-Params","<br>\n### Using a params object")
        }
        if(res.includes("-Body")){
            res = res.replace("-Body","<br>\n### Using a Body object")
        }
        if(res.includes("-NPM:")){
            const npmCodeRegex = /NPM: (.*)/; // Matches the text after "NPM: "
            const npmCodeMatch = res.match(npmCodeRegex);
            
            if (npmCodeMatch && npmCodeMatch.length >= 2) {
              const npmCode = npmCodeMatch[1].trim();
                res = res.replace(npmCode,`\n### NPM:\n\`\`\`js\n${npmCode}\n\`\`\` `)
            }

            res = res.replace("\n-NPM:","")
        }

        res = res.replaceAll("## ","<br>\n##")
        console.log(res)
        res = converter.makeHtml(res)
        console.log(res)
        
        document.querySelector("#content").innerHTML = res
    }
}
