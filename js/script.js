// Nhập (Import) các file ngôn ngữ riêng lẻ từ thư mục lang/
import { vi } from './lang/vi.js';
import { en } from './lang/en.js';
import { ko } from './lang/ko.js';
import { zh } from './lang/zh.js';

// Gộp chung lại thành một Object langData thống nhất như cũ
const langData = { vi, en, ko, zh };

const flags = { vi: 'fi-vn', en: 'fi-us', ko: 'fi-kr', zh: 'fi-cn' };
const labels = { vi: 'VI', en: 'EN', ko: 'KO', zh: 'ZH' };

// CÁC HÀM LOGIC WEB GIỮ NGUYÊN HOÀN TOÀN...
window.switchTab = function(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const targetTab = document.getElementById('tab-' + tabId);
    if(targetTab) {
        targetTab.classList.add('active');
    }
    
    document.querySelectorAll('.tab-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if(event && event.currentTarget && event.currentTarget.classList.contains('tab-link')) {
        event.currentTarget.classList.add('active');
    }
    
    if (tabId === 'trang-chu') {
        const animElements = document.querySelectorAll('.anim-fade-in-up');
        animElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; 
            el.style.animation = null;
        });
    } else if (tabId === 'co-so-vat-chat') {
        filterFacility('all');
    }
    
    const menu = document.getElementById('zenNav');
    if(menu && menu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(menu);
        bsCollapse.hide();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.filterFacility = function(category) {
    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    if(event && event.target && event.target.classList.contains('btn-filter')) {
        event.target.classList.add('active');
    }

    const items = document.querySelectorAll('.facility-item');
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hide');
            item.style.opacity = '0';
            setTimeout(() => { item.style.opacity = '1'; }, 50);
        } else {
            item.classList.add('hide');
        }
    });
}

window.changeLanguage = function(lang) {
    localStorage.setItem('selectedLang', lang);
    
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (langData[lang] && langData[lang][key]) {
            element.innerHTML = langData[lang][key];
        }
    });
    
    const flagElem = document.getElementById('current-flag');
    if (flagElem) { flagElem.className = `fi ${flags[lang]} me-2`; }
    
    const textElem = document.getElementById('current-lang-text');
    if (textElem) { textElem.innerText = labels[lang]; }

    document.documentElement.lang = lang;
}

window.handleBooking = function(event) {
    event.preventDefault();
    alert("Cảm ơn bạn! Thông tin đặt lịch đã được hệ thống tiếp nhận.");
    document.getElementById('bookingForm').reset();
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('selectedLang') || 'vi';
    changeLanguage(savedLang);
});