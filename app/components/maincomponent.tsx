'use client';
import { FontAwesomeIcon } from "@/node_modules/@fortawesome/react-fontawesome/index";
import { faSearch, faXmark, faCaretDown } from "@/node_modules/@fortawesome/free-solid-svg-icons/index";
import { GetData } from "../fetch_data_schemas/get_lang";
import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react";
import { languageClicked } from "./languageClicked";
import { after } from "node:test";


// defining few other client side component here cause i have the fectch data here//


export function Main(){
    let typedData: any[] = [];
// filtered data filters from the data//
    const [filteredary, setFilteredArray]: any[] = useState([]);
    //below state has collection of language data//
    const [data , setdata ] = useState(undefined);
    // below state is same as filteredary but this shows on the browser//
    const [indexActive, setindexActive]: any[] = useState([]);
    // state is used to verify if user clicked the search or not.//
    const [userSearched , setUserSearched] = useState({display:'block'});

    //this below state is used to show the entire language, it is also used in X when clicked it disappears//
    const [ options , setoptions ] = useState({ display: 'none'
     });
    const [userLanguageInput, setuserLanguageInput] = useState(undefined);
   
    let sourcefilter: any[] = [];
    let [source, setSource]: any[] = useState([]);
   
    useEffect(()=>{
        console.log(source)
    }, [source])
 
//gets the data from the route once//
    useEffect(()=>{

        GetData().then((data)=>{
            const {data: {languages} } = data;
            setdata( languages );
        }).catch(err => console.error(err));


        }, []);


// search engine//
    const SearchEngine = ( event: any )=>{    
        
        const eventvalue: string = event.target.value;
        
        typedData.push( eventvalue );
        const typedValues: any = typedData[ typedData.length - 1];


            // clicks 
        if( eventvalue === '' ){
            // clear the search array
            typedData = [];
            setUserSearched({display: 'block' });
            setFilteredArray([]);
            setindexActive([])
            return;  
        };


       
        if(typedValues.length == 1){
           
            setUserSearched({display: 'none' });
            data && data.filter(( _element: any, index: number ) =>{

                if( typedValues.toUpperCase() == _element.name[0].toUpperCase() ){

                    sourcefilter.push(_element)
                    filteredary.push(  _element.name );

                    indexActive.push ( _element.name  );
                    setindexActive(indexActive)
                    
                    setFilteredArray(filteredary);
                    };                
            })

            

        }
        else{
            setindexActive([]);
            const afterFirstIndex = typedValues.substring(1, typedValues.length);
            

            filteredary && filteredary.filter( (_element: any , index: number) =>{
                
                let elementvalue = _element.substring(1 , _element.length );

                if( elementvalue.startsWith( afterFirstIndex ) ){
                    setindexActive(_element)
                }
                else{
                    return;
                }

        
            })

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
                        {/* filterdata onclick will make the select language the language */}
                    <div className="filtered-data"  onClick={(event: any )=>{ setuserLanguageInput( event.target.innerHTML );  setoptions({display: 'none'});
                
                  
                
                        }}>    
                        
                            {
                              (
                                // if search has multiple results show them all else show aviable one//
                                ()=>{
                                    let value;
                                    if(typeof(indexActive) == 'object'){

                                    return value =  indexActive.map(( element: any, index: number)=>{
                                            return <span key={ index }> {element}</span>
                                          });
                                          
                                    }
                                   else{
                                    return value = (<span key = {'just01'}>{indexActive}</span>)
                                   }
                                   
                                }
                              )()
                               
                            }

                        <div className = 'parent-GET-CONTAINER' style={userSearched}>
                            <div className = 'GET-LANGUAGE-CONTAINER' onClick = { languageClicked }>
                        {/* i cannot */}
                        { 
                         data && data.map ((element: any, index: number ) =>{
                            return <span key = { index }>{element.name}</span>;
                        })
                        }
                        
                            </div>
                        </div>
                       
                    </div>
                    
                </div> 
               

                 {/* above end of languages */}
                {/* first input */}
                <div className="input-1_selector" >
                    {/* children are the main content parent as used as conatiner */}
                        {/* disabled disbable the arrtribute */}

                        
                        <div  onClick = {()=>{ setoptions({display: 'block'}) }} className = ' select-lang-1'>
                            {(()=>{
                                
                                return  userLanguageInput ? userLanguageInput : 'English'
                            })()}
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