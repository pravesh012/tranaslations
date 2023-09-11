

export const showTypedResults = function(){

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