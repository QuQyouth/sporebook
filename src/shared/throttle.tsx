export const throttle = (fn:Function, time:number) =>{
    let timer: number | undefined
    return (...args:any[])=>{
        if (timer) {
            return
        }else{
            fn(...args)
            timer = window.setTimeout(()=>{
                timer = undefined
            },time)
        }
    }
}