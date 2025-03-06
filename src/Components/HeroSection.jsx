import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <motion.div
      className="h-screen bg-hero-pattern bg-cover bg-center flex flex-col items-center justify-center text-white text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <h1 className="text-5xl font-bold">Welcome to Gilgal Revival Church</h1>
      <p className="mt-4 text-lg">A Place of Worship, Fellowship, and Revival</p>
      <button className="mt-6 bg-blue-500 px-6 py-3 rounded hover:bg-blue-700 transition">
        Join Us This Sunday
      </button>
    </motion.div>
  );
};

export default HeroSection;
