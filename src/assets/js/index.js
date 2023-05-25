main()
async function main() {
    let res = await fetch("https://raw.githubusercontent.com/MoonLGH/Tcukawi-docs/main/data/static.json")
    res = await res.json()
    let bg = res.bgHomepage

    // if bg on #back is not same as bg, set bg
    if (!document.querySelector("#back").style.backgroundImage.includes(bg)){
        document.querySelector("#back").setAttribute("style",`background-image:url("${bg}")`)
    }
}