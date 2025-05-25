// Dynamically import all component files
const modules = import.meta.glob('./ComponentLibrary/**/*.js', { eager: true });

const styles = import.meta.glob('./styles/**/*.css', {eager: true})

// Optional: You could attach them to a global if needed
window.FinysModules = modules;
