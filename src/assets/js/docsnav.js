
let normalNav = document.querySelector("#menuNormal");
let mobileNav = `
<nav id="mobile-menu" class="md:hidden pb-4 flex flex-col gap-1" aria-label="Global navigation">
${normalNav.innerHTML}
</nav>
`
function toggleNav(){
    if(document.querySelector("#mobile-menu")){
        document.querySelector("#mobile-menu").remove()
    }else{
        document.querySelector("#navigation").innerHTML += mobileNav
    }


}

let ul = ``


{/* <li>
<button type="button" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
      <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
      <span class="flex-1 ml-3 text-left whitespace-nowrap">E-commerce</span>
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</button>
<ul id="dropdown-example" class="hidden py-2 space-y-2">
      <li>
         <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
      </li>
      <li>
         <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
      </li>
      <li>
         <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
      </li>
</ul>
</li> */}
generateNav()
async function generateNav(){
    let res = await (await fetch(joindocs("path.json"))).json()
    paths = res
    console.log(paths)
    ul += `
    <li>
<button type="button" onclick="drop('dropdown-main')" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-main" data-collapse-toggle="dropdown-main">
      <span class="flex-1 ml-3 text-left whitespace-nowrap">Main</span>
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</button>
<ul id="dropdown-main" class="hidden py-2 space-y-2">
`
    // forloop res, if value is a string do something
    for(let i in res){
        if(typeof res[i] == "string"){
            ul+=`
            <li>
                <a href="?path=${res[i]}" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    <span class="ml-3">${i}</span>
                </a>
            </li>
            `
        }
    }
    ul+=`
    </ul>
</li> `
    document.querySelector("#navsUL").innerHTML = ul

    let apiStruct = generateNewStrucutre(res.API)
    console.log(apiStruct)
    let interfaceStruct = generateNewStrucutre(res.INTERFACE)
    console.log(interfaceStruct)
    
    for(let i in apiStruct){
        let li = `
        <li>
        <button type="button" onclick="drop('dropdown-${i}')" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
              <span class="flex-1 ml-3 text-left whitespace-nowrap">${i}</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <ul id="dropdown-${i}" class="hidden py-2 space-y-2">
        `

        for(let j in apiStruct[i]){
            li+=`
            <li>
                <a href="?path=${apiStruct[i][j]}" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    <span class="ml-3">${j}</span>
                </a>
            </li>
            `
        }
        li+=`
        </ul>
    </li> `
        document.querySelector("#navsUL").innerHTML += li
    }
    main()
}


function generateNewStrucutre(res){
    let obj = {}
    for (let i in res){
        if(i.includes("-")){
            let split = i.split("-")
            if(!obj[split[0]]){
                obj[split[0]] = {}
            }
            obj[split[0]][split[1]] = res[i]
        } else {
            if(obj[i]){
                obj[i][i] = res[i]
            } else {
                obj[i] = {}
                obj[i][i] = res[i]
            }
        }
    }
    return obj

}
function side(){
    document.querySelector("#default-sidebar").classList.toggle("hidden")
    document.querySelector("#content").classList.toggle("fixed")
    document.querySelector("#content").classList.toggle("z-[-1]")
}

document.addEventListener("click",function(e){
    if(e.target.hasAttribute("drawer-backdrop")){
        document.querySelector("#default-sidebar").classList.toggle("hidden")
        document.querySelector("#content").classList.toggle("fixed")
        document.querySelector("#content").classList.toggle("z-[-1]")
    }
})

function drop(id){
    document.querySelector(`#${id}`).classList.toggle("hidden")
}