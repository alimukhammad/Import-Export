import { create } from 'domain';
import Papa from 'papaparse';

// document.getElementById('fileUploader').addEventListener('change', function() {
//     var exportBtn = document.getElementById('exportBtn');
//     var importBtn = document.getElementById('importBtn');

//     if(this.files.length > 0) {                 //hidden class will be added based on action
//         exportBtn.classList.add('hidden');
//         importBtn.classList.remove('hidden');
//     } else {
//         exportBtn.classList.remove('hidden');
//         importBtn.classList.add('hidden');
//     }

//     Papa.parse(file, config);
//     console.log('File uploaded', this.files[0]);
// Script.js 

let CSV = document.getElementById('csv');   //assigning the 'cvs' id to the variable
let button = document.getElementById('btn'); //assigning the 'btn' id to the variable


CSV.addEventListener('change', (event) => {   //event listner
	const file = event.target.files[0];       //
	const reader = new FileReader();        //creating a new object file reader 

	reader.onload = (e) => {                //event listner
		const content = e.target.result;    //assigning the result of the event to the variable
		const rows = content.split('\n')    //reader>result=content>split content by new line
			.map(row => row.split(','));    //after split by new line, split by comma

		const table = document.getElementById('table');  //assign 'table' id to the variable
		table.innerHTML = '';                         //clear the table

		for (let i = 0; i < rows.length; i++) {     //loop through the rows
			let tr = document.createElement('tr');      //create a nre table row
			for (let j = 0; j < rows[i].length; j++) {  //for every row, columns loop
				let td = document.createElement('td');  //
				td.textContent = rows[i][j];            //
				tr.appendChild(td);}                    //assign td column to tr row
			table.appendChild(tr);}                 //assign tr row to table
		CSV.style.display = 'none';                 //hide csv style
		button.style.display = 'block';};        //show button style as block    

	reader.readAsText(file);                  //read the reader object as text
}); 

button.addEventListener('click', () => {                    //event listner
	const rows = document.querySelectorAll('#table tr');        //select all rows in table with id 'table' and assign to variable
	let csvContent = '';                    //create a variable to store csv content

	for (let i = 0; i < rows.length; i++) {     //loop through the rows
		let row = rows[i];                      //assign rows to variable row
		let cols = row.querySelectorAll('td');  //assign all columns in row to cols variable
		let rowContent = '';                    //create a variable to store row content
                                            //the difference btween row and rowContent is that row is the actual row in the table, while rowContent is the content of the row

		for (let j = 0; j < cols.length; j++) {         // inside the row loop through the columns
			let col = cols[j];                          //assign the column to the variable
			rowContent += col.textContent + ',';}       //every column text in col.textContent is added to rowCount with comma at the end

		csvContent += rowContent.slice(0, -1) + '\n';} //add rowContent value from the first index to the last index and add a new line at the end

	const blob = new Blob([csvContent],                 //
		{ type: 'text/csv' });                      //
	const url = window.URL.createObjectURL(blob);       //use url api to create a url for blob and pass the argument blob as the parameter

	const a = document.createElement('a'); //create a new anchor element
	a.href = url;                           //assign url to the href attribute of the anchor element
	a.download = 'exported_data.csv';       //assign the name of the file to be downloaded
	document.body.appendChild(a);           //append the anchor element to the body
	a.click();                      //on click of the anchor element the file will be downloaded
	document.body.removeChild(a);    //remove the anchor element from the body before the next click
	window.URL.revokeObjectURL(url);  //revoke the url object
});
