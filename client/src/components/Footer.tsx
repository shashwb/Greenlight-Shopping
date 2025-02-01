const Footer = () => {
  return (
    <footer className="bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-white p-4 text-center mt-6">
      <p>© 2025 Greenlight and Seth Balodi. You should hire me!</p>
      <p>
        <a href="/about" className="underline">
          About Us (dead link)
        </a>{" "}
        |{" "}
        <a href="/contact" className="underline">
          Contact (dead link)
        </a>{" "}
        |{" "}
        <a href="/faq" className="underline">
          FAQ (dead link)
        </a>
      </p>
    </footer>
  );
};

export default Footer;
