'use client';
import { FontAwesomeIcon } from "@/node_modules/@fortawesome/react-fontawesome/index";
import { faSearch, faXmark } from "@/node_modules/@fortawesome/free-solid-svg-icons/index";
import { GetData } from "../fetch_data_schemas/get_lang";
import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react";

// defining few other client side component here cause i have the fectch data here//


export function Main(){
    const [data , setdata ] = useState(undefined);
    const [ options , setoptions ] = useState({ display: 'none'
     })

    useEffect(()=>{

        GetData().then((data)=>{
            const {data: {languages} } = data;
            setdata( languages );
        }).catch(err => console.error(err));


    }, []);


    return(
        <>
        <main>
            <form >
                {/* this below div is the languages */}
                <div style = {options} className = " language-div"  >
                    <span className="inputsearch-container">
                        <input placeholder = ' Translate from' className = 'search-bar-input' type= 'text' ></input>
                        <span className="search-icons"> <FontAwesomeIcon  icon = {faSearch} /> </span>
                    </span>
                    <span className="fontawesomeicon-container-search">
                        <span onClick = {()=>{ setoptions({display: 'none'}) }} className="faXMARK"><FontAwesomeIcon icon = {faXmark} /></span>
                    </span>


                    <div className = 'GET-LANGUAGE-CONTAINER'>
                        { ( () =>{
                            let values: any[] = []
                            data && data.forEach ((element: any) =>{
                                return values.push(<span>{element.name}</span>);
                            })
                            return values
                        })()}
                        
                    </div>
                </div> 
               

                 {/* above end of languages */}
                {/* first input */}
                <div className="input-1_selector">
                    {/* children are the main content parent as used as conatiner */}
                        {/* disabled disbable the arrtribute */}
                        
                        <select  onClick = {()=>{ setoptions({display: 'block'}) }}className = ' select-lang-1'>
                            <option>test</option>
                        </select>
                        <textarea name = 'value' className= "input-left-translate"  placeholder = 'Enter Text'></textarea>


                </div>
                {/* second input */}
                <div className="input-2_selector2" >
                    {/* children are the main content */}
                    <select></select>
                </div>
            </form>
        </main>

        </>
    )
}