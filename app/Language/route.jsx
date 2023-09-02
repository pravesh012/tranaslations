
import { NextRequest , NextResponse } from "@/node_modules/next/server";
import { options } from "../fetch_data_schemas/get_lang";
// get languagess//

export async function GET( req, res ){
    let response = await fetch('https://text-translator2.p.rapidapi.com/getLanguages', options);
        response = await response.json();
            console.log(response)
        return  NextResponse.json( response )
};