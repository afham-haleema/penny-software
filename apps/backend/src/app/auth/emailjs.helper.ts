import axios from 'axios';

export async function sendResetEmail(email: string, resetLink: string) {
    const serviceId = 'service_2kbwfbj';
    const templateId = 'template_afa4myn';

    const templateParams = {
        email: email,
        link: resetLink
    };

    try {
        const response = await axios.post(
            'https://api.emailjs.com/api/v1.0/email/send',
            {
                service_id: serviceId,
                template_id: templateId,
                user_id: process.env.EMAILJS_USER_ID, 
                template_params: templateParams,
                accessToken: process.env.EMAILJS_ACCESS_TOKEN  
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );

        console.log('Email sent successfully:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error sending reset email:', error.response?.data || error.message);
        throw error;
    }
}
