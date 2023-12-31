import { useEffect, useState } from "react";

function useFetch() {
    const [url,setUrl]=useState("")
    const [loading,setLoading]=useState(false)
    const [data,setData]=useState<FormData|null>(null)
    const [asciiResult,setAsciiResult]=useState("")
    const handleSubmit =async ()=>{
        try {
            console.log("entroo");
            
            setLoading(true)

            const response = await fetch(url, {
                method: 'POST',
                body: data
            });
    
            const asciiText = await response.text();
            setAsciiResult(asciiText);
        } catch (error) {
            console.error("Error al subir y procesar la imagen", error);
        }
    }
    useEffect(()=>{if(asciiResult)setLoading(false)},[asciiResult])

    useEffect(()=>{
        if (!data&&!url) return
        handleSubmit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data,url])
    const clearData=()=>{
        setUrl("")
        setData(null)
        setAsciiResult("")
    }

    return {asciiResult,setUrl,setData,clearData,loading}
}

export default useFetch;