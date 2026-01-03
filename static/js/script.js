document.addEventListener('DOMContentLoaded', () => {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const sourceInput = document.getElementById('sourceInput');
    const uploadFields = document.getElementById('uploadFields');
    const urlFields = document.getElementById('urlFields');
    const fileInput = document.getElementById('file');
    const dropArea = document.getElementById('dropArea');
    const fileMsg = document.querySelector('.file-msg');
    const form = document.getElementById('splitForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');

    // Toggle between Upload and URL
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;

            // Update buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update source input
            sourceInput.value = target;

            // Show/hide fields
            if (target === 'upload') {
                uploadFields.classList.remove('hidden');
                urlFields.classList.add('hidden');
            } else {
                uploadFields.classList.add('hidden');
                urlFields.classList.remove('hidden');
            }
        });
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (fileInput.files.length > 0) {
            fileMsg.textContent = fileInput.files[0].name;
        }
    });

    // Drag and drop
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropArea.classList.add('is-active');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropArea.classList.remove('is-active');
        }, false);
    });

    dropArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        if (files.length > 0) {
            fileMsg.textContent = files[0].name;
        }
    }, false);

    // Form submission state
    form.addEventListener('submit', () => {
        submitBtn.disabled = true;
        btnText.textContent = 'Processing...';
        loader.classList.remove('hidden');

        // Reset after 10s just in case (browser usually handles download/refresh)
        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.textContent = 'Split PDF';
            loader.classList.add('hidden');
        }, 10000);
    });
});
