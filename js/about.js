/**
 * About page JavaScript file
 * Handles contact form and FAQ interactions
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get contact form
    const contactForm = document.getElementById('contact-form');
    
    // Get FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Add form submission event
    setupContactForm();
    
    // Set up FAQ click events
    setupFaqItems();
    
    /**
     * Set up contact form
     */
    function setupContactForm() {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('Message sent! We will get back to you as soon as possible.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    /**
     * Show form message
     * @param {string} message Message content
     * @param {string} type Message type (success/error)
     */
    function showFormMessage(message, type) {
        // Check if there is already a message element
        let messageEl = document.querySelector('.form-message');
        
        if (!messageEl) {
            // Create message element
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            contactForm.appendChild(messageEl);
        }
        
        // Set message content and type
        messageEl.textContent = message;
        messageEl.className = `form-message ${type}`;
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }
    
    /**
     * Set up FAQ item click events
     */
    function setupFaqItems() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            // Hide answers by default
            answer.style.display = 'none';
            
            // Add click event
            question.addEventListener('click', function() {
                // Toggle answer display state
                const isHidden = answer.style.display === 'none';
                
                // Hide all answers
                document.querySelectorAll('.faq-answer').forEach(a => {
                    a.style.display = 'none';
                });
                
                // Remove all active states
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                });
                
                if (isHidden) {
                    // Show current answer
                    answer.style.display = 'block';
                    question.classList.add('active');
                }
            });
        });
    }
}); 