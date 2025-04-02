/**
 * 关于页面JavaScript文件
 * 处理联系表单和FAQ交互
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取联系表单
    const contactForm = document.getElementById('contact-form');
    
    // 获取FAQ项
    const faqItems = document.querySelectorAll('.faq-item');
    
    // 添加表单提交事件
    setupContactForm();
    
    // 设置FAQ点击事件
    setupFaqItems();
    
    /**
     * 设置联系表单
     */
    function setupContactForm() {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 简单验证
            if (!name || !email || !message) {
                showFormMessage('请填写所有必填字段', 'error');
                return;
            }
            
            // 模拟表单提交
            showFormMessage('消息已发送，我们会尽快回复您！', 'success');
            
            // 重置表单
            contactForm.reset();
        });
    }
    
    /**
     * 显示表单消息
     * @param {string} message 消息内容
     * @param {string} type 消息类型 (success/error)
     */
    function showFormMessage(message, type) {
        // 检查是否已有消息元素
        let messageEl = document.querySelector('.form-message');
        
        if (!messageEl) {
            // 创建消息元素
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            contactForm.appendChild(messageEl);
        }
        
        // 设置消息内容和类型
        messageEl.textContent = message;
        messageEl.className = `form-message ${type}`;
        
        // 3秒后移除消息
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }
    
    /**
     * 设置FAQ项点击事件
     */
    function setupFaqItems() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            // 默认隐藏回答
            answer.style.display = 'none';
            
            // 添加点击事件
            question.addEventListener('click', function() {
                // 切换回答显示状态
                const isHidden = answer.style.display === 'none';
                
                // 隐藏所有回答
                document.querySelectorAll('.faq-answer').forEach(a => {
                    a.style.display = 'none';
                });
                
                // 移除所有活动状态
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                });
                
                if (isHidden) {
                    // 显示当前回答
                    answer.style.display = 'block';
                    question.classList.add('active');
                }
            });
        });
    }
}); 