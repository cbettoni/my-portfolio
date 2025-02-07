import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                © {currentYear} Portfolio de Christelle Bettoni. Tous droits réservés.
            </motion.p>
        </footer>
    );
}