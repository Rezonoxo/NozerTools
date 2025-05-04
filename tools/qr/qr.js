document.addEventListener('DOMContentLoaded', function() {
    const qrInput = document.getElementById('qrInput');
    const inputType = document.getElementById('inputType');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const qrPreview = document.getElementById('qrPreview');
    const themeToggle = document.getElementById('themeToggle');

    // Theme switching
    themeToggle.addEventListener('change', function() {
        document.documentElement.setAttribute('data-theme', this.checked ? 'dark' : 'light');
    });

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    }

    // Generate QR Code
    function generateQR(text) {
        // Clear previous QR code
        qrPreview.innerHTML = '';
        
        try {
            // Create QR Code
            const qr = qrcode(0, 'L');
            qr.addData(text);
            qr.make();

            // Create QR code image
            const qrImage = qr.createImgTag(10);
            qrPreview.innerHTML = qrImage;

            // Enable download button
            downloadBtn.disabled = false;
        } catch (error) {
            qrPreview.innerHTML = '<p style="color: red;">Błąd generowania kodu QR</p>';
            downloadBtn.disabled = true;
        }
    }

    // Format input based on type
    function formatInput(value, type) {
        switch(type) {
            case 'url':
                if (!value.startsWith('http://') && !value.startsWith('https://')) {
                    return 'https://' + value;
                }
                return value;
            case 'email':
                if (!value.startsWith('mailto:')) {
                    return 'mailto:' + value;
                }
                return value;
            case 'tel':
                if (!value.startsWith('tel:')) {
                    return 'tel:' + value;
                }
                return value;
            case 'whatsapp':
                return 'https://wa.me/' + value.replace(/[^0-9]/g, '');
            case 'facebook':
                return 'https://facebook.com/' + value.replace(/^@/, '');
            case 'twitter':
                return 'https://twitter.com/' + value.replace(/^@/, '');
            case 'instagram':
                return 'https://instagram.com/' + value.replace(/^@/, '');
            case 'linkedin':
                return 'https://linkedin.com/in/' + value.replace(/^@/, '');
            case 'youtube':
                if (value.includes('youtube.com') || value.includes('youtu.be')) {
                    return value;
                }
                return 'https://youtube.com/' + value;
            case 'spotify':
                if (value.includes('spotify.com')) {
                    return value;
                }
                return 'https://open.spotify.com/' + value;
            case 'telegram':
                return 'https://t.me/' + value.replace(/^@/, '');
            case 'wifi':
                try {
                    const [ssid, password, type = 'WPA'] = value.split(',');
                    return `WIFI:S:${ssid};T:${type};P:${password};;`;
                } catch {
                    return 'WIFI:S:' + value + ';;';
                }
            case 'sms':
                if (!value.startsWith('sms:')) {
                    const [number, message = ''] = value.split(',');
                    return `sms:${number}:${message}`;
                }
                return value;
            case 'location':
                try {
                    const [lat, lon] = value.split(',');
                    return `geo:${lat},${lon}`;
                } catch {
                    return 'geo:' + value;
                }
            case 'app':
                if (!value.startsWith('market://')) {
                    return 'market://details?id=' + value;
                }
                return value;
            default:
                return value;
        }
    }

    // Add input placeholder update based on type
    inputType.addEventListener('change', function() {
        const placeholders = {
            text: 'Wprowadź dowolny tekst',
            url: 'Wprowadź adres URL (np. example.com)',
            email: 'Wprowadź adres email',
            tel: 'Wprowadź numer telefonu',
            whatsapp: 'Wprowadź numer telefonu (z kierunkowym)',
            facebook: 'Wprowadź nazwę użytkownika lub ID',
            twitter: 'Wprowadź nazwę użytkownika (bez @)',
            instagram: 'Wprowadź nazwę użytkownika (bez @)',
            linkedin: 'Wprowadź nazwę użytkownika',
            youtube: 'Wprowadź ID kanału lub pełny URL',
            spotify: 'Wprowadź URI lub link do zawartości',
            telegram: 'Wprowadź nazwę użytkownika (bez @)',
            wifi: 'Format: nazwa_sieci,hasło,typ(WPA/WEP)',
            sms: 'Format: numer,wiadomość',
            location: 'Format: szerokość,długość',
            app: 'Wprowadź ID aplikacji lub pełny link'
        };
        
        qrInput.placeholder = placeholders[this.value] || 'Wprowadź tekst';
    });

    // Generate QR code on button click
    generateBtn.addEventListener('click', function() {
        const text = formatInput(qrInput.value.trim(), inputType.value);
        if (text) {
            generateQR(text);
        } else {
            qrPreview.innerHTML = '<p style="color: red;">Wprowadź tekst do wygenerowania kodu QR</p>';
            downloadBtn.disabled = true;
        }
    });

    // Download QR code
    downloadBtn.addEventListener('click', function() {
        const img = qrPreview.querySelector('img');
        if (img) {
            // Create a canvas to handle the download
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            // Set canvas size to match QR code size plus padding
            const padding = 40; // 20px padding on each side
            canvas.width = img.width + padding;
            canvas.height = img.height + padding;
            
            // Fill background white
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw QR code in the center
            context.drawImage(img, padding/2, padding/2);
            
            // Create download link
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    });

    // Clear input and QR code
    clearBtn.addEventListener('click', function() {
        qrInput.value = '';
        qrPreview.innerHTML = '';
        downloadBtn.disabled = true;
    });

    // Save theme preference
    themeToggle.addEventListener('change', function() {
        localStorage.setItem('theme', this.checked ? 'dark' : 'light');
    });
});