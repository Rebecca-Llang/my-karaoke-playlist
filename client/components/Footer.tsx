import { MdEmail } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import type { FooterLink } from '../../models/footer'

const footerLinks: FooterLink[] = [
  { title: 'Email', icon: MdEmail, link: 'mailto:rebeccalang50@gmail.com' },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/rebecca-lang-nz/',
    icon: FaLinkedin,
  },
  { title: 'GitHub', link: 'https://github.com/Rebecca-Llang', icon: FaGithub },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <ul className="footer-links">
          {footerLinks.map(({ title, link, icon: Icon }) => (
            <li key={title} className="footer-link-item">
              <a
                href={link}
                target={link.startsWith('http') ? '_blank' : undefined}
                rel={
                  link.startsWith('http') ? 'noopener noreferrer' : undefined
                }
                className="footer-link"
                aria-label={title}
              >
                <Icon aria-hidden={true} className="footer-icon" />
                <span>{title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
