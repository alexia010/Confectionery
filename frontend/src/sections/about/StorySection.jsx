import { motion } from "framer-motion";


// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const AboutSection = () => {
  return (

        <section className="flex flex-col md:flex-row w-full md:h-140 bg-brown ">

        <motion.div 

            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <img 
            src="/backgroundAboutUs.jpg" 
            alt="Cofetăria noastră"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-0" 
            />
        
        
        </motion.div>
        
        
        <motion.div 
            className="w-full md:w-1/2 flex items-center justify-center py-8 h-96 md:h-full"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="max-w-xl text-white space-y-6">
            <motion.h2 
                variants={fadeInUp} 
                className="text-4xl font-sans font-light md:text-5xl text-black"
            >
                Povestea noastră
            </motion.h2>
            <motion.p 
                variants={fadeInUp} 
                className="text-black text-lg md:text-xl leading-relaxed"
            >
                De la un vis dulce la realitate, cofeteria noastră s-a născut din pasiune pentru deserturi autentice.
                În fiecare prăjitură se regăsește o poveste, o emoție, un moment de bucurie.
            </motion.p>
            <motion.p 
                variants={fadeInUp} 
                className="text-black text-lg md:text-xl leading-relaxed"
            >
                Vă invităm să descoperiți gustul care ne definește și să vă alăturați călătoriei noastre culinare, unde tradițiile se împletesc cu inovația pentru a crea experiențe memorabile.
            </motion.p>
            </div>
        </motion.div>
        </section> 
  )
}
export default AboutSection;



