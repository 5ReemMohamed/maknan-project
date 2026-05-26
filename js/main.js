window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
window.addEventListener("resize", () => {

    const offcanvasEl = document.getElementById("mobileMenu");
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);

    if (window.innerWidth >= 992 && offcanvas) {
        offcanvas.hide();
    }

});
document.addEventListener("click", function (e) {

    const link = e.target.closest(".offcanvas .nav-link");

    if (!link) return;

    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    const offcanvasEl = document.getElementById("mobileMenu");

    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);

    offcanvas.hide();

    setTimeout(() => {
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }, 300);

});
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;
            const speed = target / 100;

            const updateCounter = () => {

                count += speed;

                if (count < target) {
                    counter.innerText = Math.floor(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

}, { threshold: .5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});


document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});



const slider = document.getElementById("comparisonSlider");
const beforeWrapper = document.getElementById("beforeWrapper");
const sliderLine = document.getElementById("sliderLine");

let isDragging = false;

function updateSlider(x) {

    const rect = slider.getBoundingClientRect();

    let position = ((x - rect.left) / rect.width) * 100;

    position = Math.max(5, Math.min(95, position));

    beforeWrapper.style.width = position + "%";

    sliderLine.style.left = position + "%";
}

slider.addEventListener("mousedown", () => {

    isDragging = true;

});

window.addEventListener("mouseup", () => {

    isDragging = false;

});

slider.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    updateSlider(e.clientX);

});


slider.addEventListener("touchstart", () => {

    isDragging = true;

});

slider.addEventListener("touchend", () => {

    isDragging = false;

});

slider.addEventListener("touchmove", (e) => {

    updateSlider(e.touches[0].clientX);

});
document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const btn = item.querySelector(".faq-question");

        btn.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            faqItems.forEach(el => el.classList.remove("active"));

            if (!isActive) {
                item.classList.add("active");
            }

        });

    });
    const form = document.getElementById("contactForm");

    const name = document.getElementById("fullName");
    const phone = document.getElementById("phone");
    const city = document.getElementById("city");
    const service = document.getElementById("service");

    const successMessage = document.getElementById("successMessage");

    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const cityError = document.getElementById("cityError");
    const serviceError = document.getElementById("serviceError");

    // Regex
    const nameRegex = /^[A-Za-z\u0600-\u06FF\s]{3,}$/; // عربي + إنجليزي
    const phoneRegex = /^05\d{8}$/; // رقم سعودي 10 digits يبدأ بـ 05

    function showError(inputError, message) {
        inputError.innerText = message;
        inputError.style.display = "block";
    }

    function hideError(inputError) {
        inputError.innerText = "";
        inputError.style.display = "none";
    }

    name.addEventListener("input", () => {
        if (!name.value.trim()) {
            showError(nameError, "الاسم مطلوب");
        } else if (!nameRegex.test(name.value.trim())) {
            showError(nameError, "الاسم يجب أن يكون 3 حروف على الأقل");
        } else {
            hideError(nameError);
        }
    });

    phone.addEventListener("input", () => {
        if (!phone.value.trim()) {
            showError(phoneError, "رقم الجوال مطلوب");
        } else if (!phoneRegex.test(phone.value.trim())) {
            showError(phoneError, "رقم الجوال يجب أن يكون 05xxxxxxxx");
        } else {
            hideError(phoneError);
        }
    });

    city.addEventListener("change", () => {
        if (!city.value) {
            showError(cityError, "المدينة مطلوبة");
        } else {
            hideError(cityError);
        }
    });

    service.addEventListener("change", () => {
        if (!service.value) {
            showError(serviceError, "نوع الخدمة مطلوب");
        } else {
            hideError(serviceError);
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let valid = true;

       
        if (!name.value.trim() || !nameRegex.test(name.value.trim())) {
            showError(nameError, "اسم غير صالح");
            valid = false;
        }

        if (!phone.value.trim() || !phoneRegex.test(phone.value.trim())) {
            showError(phoneError, "رقم غير صالح");
            valid = false;
        }

        if (!city.value) {
            showError(cityError, "اختر المدينة");
            valid = false;
        }

        if (!service.value) {
            showError(serviceError, "اختر الخدمة");
            valid = false;
        }

        if (!valid) return;

        
        const message = `
طلب جديد:
الاسم: ${name.value}
الجوال: ${phone.value}
المدينة: ${city.value}
الخدمة: ${service.value}
        `;

        const whatsappURL = `https://wa.me/966556935907?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");

     
        successMessage.style.display = "block";

        setTimeout(() => {
            successMessage.style.display = "none";
        }, 10000);

        
        form.reset();

        
        document.querySelectorAll(".error").forEach(e => {
            e.style.display = "none";
        });
    });

});
  AOS.init({
    duration: 1000,   
    once: true,      
    offset: 120,      
    easing: "ease-in-out"
  });