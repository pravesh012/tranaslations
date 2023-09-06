'use client';
import { FontAwesomeIcon } from "@/node_modules/@fortawesome/react-fontawesome/index";
import { faSearch, faXmark, faCaretDown } from "@/node_modules/@fortawesome/free-solid-svg-icons/index";
import { GetData } from "../fetch_data_schemas/get_lang";
import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react";
import { languageClicked } from "./languageClicked";


// defining few other client side component here cause i have the fectch data here//


export function Main(){
    let typedData: any[] = [];
    const filteredary: any[] = [];
    const thirdFiltered:any[] = []
    const [data , setdata ] = useState(undefined);
    const [ options , setoptions ] = useState({ display: 'none'
     });
    
    //  counter keep tracks of indexs of each input;//
   
    //  second iteration on search//
 



    useEffect(()=>{

        GetData().then((data)=>{
            const {data: {languages} } = data;
            setdata( languages );
        }).catch(err => console.error(err));


        }, []);



    const SearchEngine = ( event: any )=>{    
        const eventvalue: string = event.target.value;
        typedData.push( eventvalue );
        const typedValues: any = typedData[ typedData.length - 1];


            
        if( eventvalue === '' ){
            // clear the search array
            typedData = [];
            return;  
        };


       
        if(typedValues.length == 1){
           console.log('im here 1')
            data && data.filter(( _element: any ) =>{

                if( typedValues == _element.name[0] ){
                    filteredary.push( _element );
                    return;
                };
                 
                
            })

        }
        else if( typedValues.length == 2 ){
           
            filteredary.filter(( _element ) =>{

                if( typedValues.charAt(1) == _element.name.charAt(1) ){
                    console.log( _element )
                    thirdFiltered.push(_element);
                };

            })

        }
        else{


            
            for(let index = 0; index < thirdFiltered.length; index++){
                console.log('im here 3')
                if(thirdFiltered.length == 1){
                    console.log('it is' , thirdFiltered)
                    
                }
                else{
                    console.log('more options')
                }


            }

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
                    <div className = 'parent-GET-CONTAINER' >
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