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
});