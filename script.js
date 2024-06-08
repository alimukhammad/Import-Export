import Papa from 'papaparse';

document.getElementById('fileUploader').addEventListener('change', function() {
    var exportBtn = document.getElementById('exportBtn');
    var importBtn = document.getElementById('importBtn');

    if(this.files.length > 0) {                 //hidden class will be added based on action
        exportBtn.classList.add('hidden');
        importBtn.classList.remove('hidden');
    } else {
        exportBtn.classList.remove('hidden');
        importBtn.classList.add('hidden');
    }

    Papa.parse(file, config);
    console.log('File uploaded', this.files[0]);

    $('input[type=file]').parse({
        config: {
            // base config to use for each file
            // any, delimiter = ""; // auto-detect
        },
        before: function(file, inputElem)
        {
            // executed before parsing each file begins;
            // what you return here controls the flow
        },
        error: function(err, file, inputElem, reason)
        {
            // executed if an error occurs while loading the file,
            // or if before callback aborted for some reason
        },
        complete: function()
        {
            // executed after all files are complete
        }
    });
});