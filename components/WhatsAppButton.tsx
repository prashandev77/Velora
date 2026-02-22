'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/94771234567?text=Hi%20Velora%20Journeys%2C%20I%20would%20like%20to%20plan%20a%20trip."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, type: 'spring', stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-110"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-6 h-6" />
        </motion.a>
    );
}
