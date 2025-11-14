// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('Name');
        const email = formData.get('Email');
        const message = formData.get('Message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля формы.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Пожалуйста, введите корректный email адрес.');
            return;
        }
        
        // Get form action URL
        const formAction = contactForm.getAttribute('action');
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        try {
            // Send form data to Google Apps Script
            // Google Apps Script requires special handling - we'll use fetch with mode: 'no-cors'
            const response = await fetch(formAction, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
            
            // With 'no-cors', we can't read the response, but if no error is thrown, it succeeded
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
        } finally {
            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Smooth scrolling for footer links
    /*
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#about' || targetId === '#privacy' || targetId === '#terms') {
                // For now, just show an alert
                alert(`Раздел "${this.textContent}" будет добавлен позже.`);
            }
        });
    });
   */
    
    // Add scroll animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Utility function to handle form errors
function showError(message) {
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background-color: #fee;
        color: #c53030;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        border: 1px solid #feb2b2;
    `;
    errorDiv.textContent = message;
    
    // Insert before form
    const contactForm = document.getElementById('contactForm');
    contactForm.parentNode.insertBefore(errorDiv, contactForm);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}
