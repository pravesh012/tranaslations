'use client';
import { FontAwesomeIcon } from "@/node_modules/@fortawesome/react-fontawesome/index";
import { faSearch, faXmark, faCaretDown } from "@/node_modules/@fortawesome/free-solid-svg-icons/index";
import { GetData } from "../fetch_data_schemas/get_lang";
import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react";
import { languageClicked } from "./languageClicked";


// defining few other client side component here cause i have the fectch data here//


export function Main(){
    const [data , setdata ] = useState(undefined);
    const [ options , setoptions ] = useState({ display: 'none'
     });
     const [ typedSearch, setTypedSerach ] = useState([]);
     const [ hideSpans , setHideSpans ] = useState('block');



    useEffect(()=>{

        GetData().then((data)=>{
            const {data: {languages} } = data;
            setdata( languages );
        }).catch(err => console.error(err));


    }, []);



    // useEffect(()=>{

    //     const StringValue = typedSearch[ typedSearch.length - 1];
    //     console.log(data)
    //     if(data){

    //         data.filter(( _element: any , _index: number ) =>{
    //             const options = 
    //         })

    //     }
    //     else{
    //         console.error('error data is empty')
    //     }


    // }, [typedSearch])


    const SearchEngine = ( event: any )=>{        
        const eventvalue = event.target.value;
            eventvalue.length > 1 ? setHideSpans('none') : setHideSpans('block')

            console.log(hideSpans)
        if(eventvalue == ''){
           setTypedSerach([]); 
        }
        else{
            const result = [...typedSearch, eventvalue];
            setTypedSerach(result);
        }
        


            


    }

    return(
        <>
        <main>
            <form >
                {/* this below div is the languages */}
                <div style = {options} className = " language-div"  >
                    <span className="inputsearch-container">
                        <input placeholder = ' Translate from' className = 'search-bar-input' type= 'text' onChange= {SearchEngine} ></input>
                        <span className="search-icons"> <FontAwesomeIcon  icon = {faSearch} /> </span>
                    </span>
                    <span className="fontawesomeicon-container-search">
                        <span onClick = {()=>{ setoptions({display: 'none'}) }} className="faXMARK"><FontAwesomeIcon icon = {faXmark} /></span>
                    </span>

                        {/* hide the parent instead of child, child is grid */}
                    <div className = 'parent-GET-CONTAINER' style = {{ display:hideSpans }}>
                        <div className = 'GET-LANGUAGE-CONTAINER' onClick = { languageClicked } >
                        {/* i cannot */}
                        { 
                         data && data.map ((element: any, index: number ) =>{
                            return <span  key = { index }>{element.name}</span>;
                        })
                        }
                        
                    </div>
                    </div>
                    
                </div> 
               

                 {/* above end of languages */}
                {/* first input */}
                <div className="input-1_selector">
                    {/* children are the main content parent as used as conatiner */}
                        {/* disabled disbable the arrtribute */}
                        
                        <div onClick = {()=>{ setoptions({display: 'block'}) }} className = ' select-lang-1'>English
                            <FontAwesomeIcon className = 'dropdown-div'icon = { faCaretDown }/>

                        </div>
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