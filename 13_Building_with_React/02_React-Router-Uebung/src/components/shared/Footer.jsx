const Footer = () => {
  return (
    <footer className='footer sm:footer-horizontal bg-neutral text-neutral-content p-10'>
      <nav>
        <h2 className='footer-title'>Services</h2>
        <a href='/destinations' className='link link-hover'>
          Destinations
        </a>
      </nav>
      <nav>
        <h2 className='footer-title'>Company</h2>{' '}
        <a href='/about' className='link link-hover'>
          About
        </a>
        <a href='/contact' className='link link-hover'>
          Contact
        </a>
      </nav>
      <nav>
        <h2 className='footer-title'>Legal</h2>
        <a className='link link-hover' href='#'>
          Terms of use
        </a>
        <a className='link link-hover' href='#'>
          Privacy policy
        </a>
        <a className='link link-hover' href='#'>
          Cookie policy
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
