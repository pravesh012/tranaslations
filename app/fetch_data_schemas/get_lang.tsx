
export const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '03619ff40fmsh01eadc618618e26p1dc4f1jsn5c13d52fd087',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};
export const GetData = () => {
	'use client';
	const response = fetch('http://localhost:3000/Language').then( resp => resp.json()).then((data) =>{
		return data;
	});
	return response
}
