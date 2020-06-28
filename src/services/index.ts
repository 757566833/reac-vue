export const getWebAuthority:()=>Promise<{[key:string]:boolean}> = async ()=>{
    return {
        menu1:true,
        submenu1:true,
        menu11:true,
        submenu2:true,
        menu21:true
    }
}