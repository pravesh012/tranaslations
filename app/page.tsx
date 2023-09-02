import './all.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Suspense } from "react";
import {Main} from './components/maincomponent';
export default async function(){
  function test(): void{
  }
  return(
    <>
      <Suspense fallback = {<h1>loading...</h1>}>
         <Main />
      </Suspense>
    </>
  )
}