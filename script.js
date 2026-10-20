// Testimonials Dataset
const reviewsData = [
    {
        id: 'rev-1',
        nameKm: 'សុខ លីដា',
        nameEn: 'Sok Lida',
        roleKm: 'បុគ្គលិកសេវាកម្មអតិថិជន (Customer Service)',
        roleEn: 'Customer Service Representative',
        type: 'Candidate',
        stars: 5,
        textKm: 'ភ្នាក់ងារ ហួកាំងថារ៉ា ជួយខ្ញុំឱ្យទទួលបានការងារយ៉ាងលឿន! ដំណើរការលឿន ផ្តល់ព័ត៌មានច្បាស់លាស់ និងគ្មានការភូតភរឡើយ។',
        textEn: 'Huokaing Thara Recruitment helped me land my job so quickly! Transparent communication and a very professional team.'
    },
    {
        id: 'rev-2',
        nameKm: 'ចាន់ ធារ៉ា',
        nameEn: 'Chan Theara',
        roleKm: 'តារាម៉ូឌែល / Model Talent',
        roleEn: 'Model & Commercial Talent',
        type: 'Candidate',
        stars: 5,
        textKm: 'ទទួលបានឱកាសថតពាណិជ្ជកម្មធំៗជាមួយប្រែនល្បីៗ។ ភ្នាក់ងារមានការយកចិត្តទុកដាក់លើសុវត្ថិភាព និងកិច្ចសន្យាច្បាស់លាស់។',
        textEn: 'Great commercial placement opportunities with top brands. The team ensured contract clarity and safety at every step.'
    },
    {
        id: 'rev-3',
        nameKm: 'ក្រុមហ៊ុន Khmer Cyber Shield',
        nameEn: 'Khmer Cyber Shield Co.',
        roleKm: 'អ្នកគ្រប់គ្រងធនធានមនុស្ស (HR Director)',
        roleEn: 'HR Director',
        type: 'Employer',
        stars: 5,
        textKm: 'យើងខ្ញុំបានប្រើប្រាស់សេវាកម្មជ្រើសរើសបុគ្គលិក IT ពី ហួកាំងថារ៉ា។ បេក្ខជនដែលទទួលបានមានសមត្ថភាពខ្ពស់ និងត្រូវតាមតម្រូវការ។',
        textEn: 'We partnered with Huokaing Thara Recruitment for tech hiring. The candidates presented were highly qualified and perfectly matched.'
    }
];

// Current State
let currentLang = 'km';
let currentFilter = 'all';

// DOM Elements
const langToggleBtn = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
const reviewsContainer = document.getElementById('reviews-container');
const filterBtns = document.querySelectorAll('.tab-btn');
const reviewForm = document.getElementById('review-submission-form');

// Language Switcher Function
langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'km' ? 'en' : 'km';
    langText.textContent = currentLang === 'km' ? 'English' : 'ភាសាខ្មែរ';
    
    updateStaticTranslations();
    renderReviews();
});

function updateStaticTranslations() {
    document.querySelectorAll('[data-km]').forEach(elem => {
        const text = elem.getAttribute(`data-${currentLang}`);
        if (text) elem.innerHTML = text;
    });
}

// Render Review Cards Dynamically
function renderReviews() {
    reviewsContainer.innerHTML = '';

    const filtered = reviewsData.filter(rev => currentFilter === 'all' || rev.type === currentFilter);

    filtered.forEach(rev => {
        const card = document.createElement('div');
        card.className = 'review-card';

        const name = currentLang === 'km' ? rev.nameKm : rev.nameEn;
        const role = currentLang === 'km' ? rev.roleKm : rev.roleEn;
        const text = currentLang === 'km' ? rev.textKm : rev.textEn;
        const starsText = '⭐'.repeat(rev.stars);
        const initial = name.charAt(0);

        card.innerHTML = `
            <div>
                <div class="review-stars">${starsText}</div>
                <p class="review-text">“${text}”</p>
            </div>
            <div class="review-author">
                <div class="avatar">${initial}</div>
                <div class="author-details">
                    <strong>${name}</strong>
                    <span>${role}</span>
                </div>
            </div>
        `;

        reviewsContainer.appendChild(card);
    });
}

// Filter Tabs Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderReviews();
    });
});

// Review Submission Handler
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rev-name').value;
    const role = document.getElementById('rev-role').value;
    const type = document.getElementById('rev-type').value;
    const stars = parseInt(document.getElementById('rev-stars').value, 10);
    const text = document.getElementById('rev-text').value;

    reviewsData.unshift({
        id: `rev-${Date.now()}`,
        nameKm: name,
        nameEn: name,
        roleKm: role,
        roleEn: role,
        type: type,
        stars: stars,
        textKm: text,
        textEn: text
    });

    alert(currentLang === 'km' ? 'សូមអរគុណសម្រាប់ការចែករំលែកការវាយតម្លៃរបស់អ្នក!' : 'Thank you for submitting your review!');
    reviewForm.reset();
    renderReviews();
});

// Initial Setup
updateStaticTranslations();
renderReviews();
