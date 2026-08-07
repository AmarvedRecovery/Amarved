/* 
 * Amarved Recovery System - E-Book Dynamic Form Handler with PDF.js & Turnstile
 */

const EBOOK_CONFIG = {
    en: {
        id: "EN_EBOOK",
        sheetName: "Leads_Amarved_EN",
        badge: "Free Resource",
        title: "Download the <span class=\"gradient-text\">FREE</span> AmarVed Recovery System E-Book",
        subtitle: "Learn the science behind chronic fatigue, fibromyalgia, chronic pain, brain fog, IBS, Long COVID, and nervous system recovery.",
        labelName: "Full Name *",
        labelWhatsapp: "WhatsApp Number *",
        labelEmail: "Email Address *",
        btnSubmit: "Unlock My Free E-Book",
        successTitle: "<i class=\"ph-fill ph-check-circle\"></i> Thank you! Your e-book is now unlocked.",
        successSubtitle: "You can read it right here on our website or download the PDF to your device.",
        btnRead: "Read Online",
        btnDownload: "Download PDF",
        mockup: "images/ebook_mockup_en.png",
        pdfUrl: "pdfs/Amarved_PDF_(English).pdf"
    },
    hi: {
        id: "HI_EBOOK",
        sheetName: "Leads_Amarved_HI",
        badge: "मुफ़्त संसाधन",
        title: "<span class=\"gradient-text\">मुफ़्त</span> AmarVed Recovery System ई-बुक डाउनलोड करें",
        subtitle: "क्रोनिक फटीग, फाइब्रोमायल्गिया, पुराने दर्द, ब्रेन फॉग, IBS, लॉन्ग COVID और नर्वस सिस्टम रिकवरी के पीछे के विज्ञान को जानें।",
        labelName: "पूरा नाम *",
        labelWhatsapp: "WhatsApp नंबर *",
        labelEmail: "ईमेल पता *",
        btnSubmit: "मेरी मुफ़्त ई-बुक अनलॉक करें",
        successTitle: "<i class=\"ph-fill ph-check-circle\"></i> धन्यवाद! आपकी ई-बुक अनलॉक हो गई है।",
        successSubtitle: "आप इसे सीधे हमारी वेबसाइट पर पढ़ सकते हैं या पीडीएफ डाउनलोड कर सकते हैं।",
        btnRead: "ऑनलाइन पढ़ें",
        btnDownload: "पीडीएफ डाउनलोड करें",
        mockup: "images/ebook_mockup_hi.png",
        pdfUrl: "pdfs/Amarved_PDF_(Hindi).pdf"
    }
};

// REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyU10M3zrTTUKlauwW4hORtRK7KWNIG95IO-wUC0cp8yiehY38sPCgEkiXtxiwSsrQQ/exec';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || 'en';
    const config = EBOOK_CONFIG[lang] || EBOOK_CONFIG['en'];

    // State variables for warning before exit
    let isFormSubmitted = false;
    let hasDownloadedPDF = false;

    // Inject Content
    document.getElementById('badge-text').innerHTML = config.badge;
    document.getElementById('hero-title').innerHTML = config.title;
    document.getElementById('hero-subtitle').innerHTML = config.subtitle;
    document.getElementById('label-name').innerHTML = config.labelName;
    document.getElementById('label-whatsapp').innerHTML = config.labelWhatsapp;
    document.getElementById('label-email').innerHTML = config.labelEmail;
    document.getElementById('btn-text-submit').innerHTML = config.btnSubmit;
    document.getElementById('success-title').innerHTML = config.successTitle;
    document.getElementById('success-subtitle').innerHTML = config.successSubtitle;
    document.getElementById('btn-text-read').innerHTML = config.btnRead;
    document.getElementById('btn-text-download').innerHTML = config.btnDownload;
    document.getElementById('pdf-viewer-title').innerHTML = config.badge + " - Amarved";

    const downloadLink = document.getElementById('download-link');
    downloadLink.href = config.pdfUrl;
    downloadLink.addEventListener('click', () => {
        hasDownloadedPDF = true;
    });

    const mockupImg = document.getElementById('mockup-img');
    mockupImg.src = config.mockup;
    mockupImg.style.display = 'inline-block';

    document.getElementById('form-container').style.display = 'block';

    const ebookForm = document.getElementById('ebook-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text-submit');
    const spinner = submitBtn.querySelector('.spinner');

    if (ebookForm) {
        ebookForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Turnstile captcha validation removed for testing

            const name = document.getElementById('name').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!name || !whatsapp || !email) {
                alert('Please fill in all required fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) { alert('Please enter a valid email address.'); return; }

            const phoneRegex = /^[+]?[\d\s-]{10,}$/;
            if (!phoneRegex.test(whatsapp)) { alert('Please enter a valid WhatsApp number.'); return; }

            // Loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            spinner.style.display = 'inline-block';

            try {
                const formData = new FormData();
                formData.append('Timestamp', new Date().toISOString());
                formData.append('Name', name);
                formData.append('WhatsApp', whatsapp);
                formData.append('Email', email);
                formData.append('EbookID', config.id);
                formData.append('SheetName', config.sheetName);
                formData.append('PageURL', window.location.href);
                formData.append('Language', lang);
                formData.append('TurnstileToken', '');

                // Grab UTMs
                ['utm_source', 'utm_medium', 'utm_campaign'].forEach(param => {
                    formData.append(param, urlParams.get(param) || '');
                });

                if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
                    console.warn("Google Script URL not set. Simulating success.");
                    setTimeout(() => showSuccess(config.pdfUrl), 1500);
                } else {
                    const response = await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        body: formData
                    });

                    const resultData = await response.json().catch(() => ({}));

                    if (resultData.result === 'duplicate') {
                        console.log("Duplicate lead detected. Granting access without re-logging.");
                        showSuccess(config.pdfUrl);
                    } else if (resultData.result === 'success') {
                        showSuccess(config.pdfUrl);
                    } else {
                        // Could be a Turnstile failure or other error
                        alert(resultData.error || 'Submission failed. Please try again.');
                        throw new Error('Submission failed');
                    }
                }
            } catch (error) {
                console.error(error);
                submitBtn.disabled = false;
                btnText.style.display = 'inline-block';
                spinner.style.display = 'none';
            }
        });
    }

    function showSuccess(pdfUrl) {
        isFormSubmitted = true;
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('success-container').style.display = 'block';

        document.getElementById('read-online-btn').addEventListener('click', () => {
            document.getElementById('pdf-viewer-section').style.display = 'block';
            document.getElementById('pdf-viewer-section').scrollIntoView({ behavior: 'smooth' });
            initPDFViewer(pdfUrl);
        });
    }

    // Warn before leaving if they unlocked but didn't download
    window.addEventListener('beforeunload', (e) => {
        if (isFormSubmitted && !hasDownloadedPDF) {
            e.preventDefault();
            e.returnValue = ''; // Standard requirement for modern browsers
            return '';
        }
    });

    // --- Direct iframe PDF Viewer Logic ---
    function initPDFViewer(url) {
        const iframe = document.getElementById('pdf-iframe');
        if (iframe) {
            iframe.src = url;
        }
    }
});
